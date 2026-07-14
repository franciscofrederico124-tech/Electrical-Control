#pragma once
#include <Arduino.h>

const String ssid = "Projecto anual";
const String password = "*rojecto anual";
const String apiBase = "https://electrical-control.onrender.com";

int servo_deg = 0;
int light = 0;
bool increment = true;
bool mov = true;

#define v_sensor_pin 35
#define servo_pin 13
#define green_pin 12
#define yellow_pin 14
#define ldr_pin 34