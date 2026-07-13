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
Sensor ldr;
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
  ldr.begin(ldr_pin);
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

  const int voltage_value = ((int)(round((int)(voltage_sensor.read_analog() * 25) / 4095)));

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

  doc["time"]["status"] = "NTP synchronization error";

  String json_payload;
  serializeJsonPretty(doc, json_payload);

  Serial.println(json_payload);
  String res_ = send_data(json_payload);

  printf("\n| > Resposta do servidpr: %s\n", res_.c_str());
  delay(5000);
}
