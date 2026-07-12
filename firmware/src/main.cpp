#include <Arduino.h>
#include "./hooks/read_sensor.h"
#include "./hooks/global.h"
#include "./hooks/actors.h"
#include "./functions/connect_to_wifi.h"
#include "./functions/send_data.h"
#include <ArduinoJson.h>
#include <ESP32Servo.h>
#include <mat.h>
#include "time.h"

Sensor voltage_sensor;
Servo solar_servo;
Actor green;
Actor yellow;

const char *ntp_server = "africa.pool.ntp.org";
const long gmt_offset_sec = 3600;
const int daylight_offset_sec = 0;

void setup()
{
  Serial.begin(115200);
  voltage_sensor.begin(v_sensor_pin);
  green.begin(green_pin);
  yellow.begin(yellow_pin);
  green.low();
  yellow.low();

  solar_servo.attach(servo_pin);
  solar_servo.write(0);
  delay(300);

  printf("| > System initializing! \n");
  connect_to_wifi();

  configTime(gmt_offset_sec, daylight_offset_sec, ntp_server);
}

void loop()
{
  struct tm time_info;
  time_t epoch_time;
  time(&epoch_time);

  bool is_time_valid = getLocalTime(&time_info);
  int servo_angle = 0;

  if (is_time_valid)
  {
    int current_hour = time_info.tm_hour;
    int current_minute = time_info.tm_min;

    int total_minutes_today = (current_hour * 60) + current_minute;
    int sunrise_minutes = 6 * 60;
    int sunset_minutes = 18 * 60;

    if (total_minutes_today >= sunrise_minutes && total_minutes_today <= sunset_minutes)
    {
      servo_angle = map(total_minutes_today, sunrise_minutes, sunset_minutes, 0, 180);
    }
    else
    {
      servo_angle = 0;
    }
  }

  solar_servo.write(servo_angle);

  const int voltage_value = ((int)(round((int)(voltage_sensor.read_analog() * 25) / 4095 )));

  if (voltage_value < 1)
  {
    green.low();
    yellow.high();
  }
  else
  {
    green.high();
    yellow.low();
  }

  JsonDocument doc;
  doc["firmware"]["platform"] = "esp32 dev module";
  doc["firmware"]["version"] = "1.1.0";

  doc["data"]["v"] = String(voltage_value) + "V";
  doc["data"]["i"] = String(2) + "A";
  doc["data"]["P"] = String((int)round(voltage_value * 2)) + "W";

  if (is_time_valid)
  {
    char formatted_date[12];
    char formatted_time[9];
    sprintf(formatted_date, "%02d/%02d/%04d", time_info.tm_mday, time_info.tm_mon + 1, time_info.tm_year + 1900);
    sprintf(formatted_time, "%02d:%02d:%02d", time_info.tm_hour, time_info.tm_min, time_info.tm_sec);

    doc["time"]["date"] = formatted_date;
    doc["time"]["hour"] = formatted_time;
    doc["time"]["epoch"] = (unsigned long)epoch_time;
  }
  else
  {
    doc["time"]["status"] = "NTP synchronization error";
  }

  String json_payload;
  serializeJsonPretty(doc, json_payload);

  Serial.println(json_payload);
  String res_ = send_data(json_payload);

  printf("\n| > Resposta do servidpr: %s\n", res_.c_str());
  delay(5000);
}
