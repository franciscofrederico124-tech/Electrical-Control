#pragma
#include <WiFi.h>
#include <Arduino.h>
#include "../hooks/global.h"

void connect_to_wifi()
{
    WiFi.begin(ssid, password);
    Serial.printf("\n| > Conectando ao wifi - %s ", ssid.c_str());
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.printf(".");
        delay(500);
    }

    Serial.printf("\n| > Sisetma conectado à rede %s\n", ssid.c_str());
    
}