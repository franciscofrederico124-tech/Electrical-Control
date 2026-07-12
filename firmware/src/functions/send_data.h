#pragma
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include "../hooks/global.h"

String send_data(String data)
{
    if (WiFi.status() == WL_CONNECTED)
    {
        printf("\n| > Enviando dados para API... \n");

        HTTPClient client;
        client.begin(apiBase + "/system/get-data");

        client.addHeader("Content-Type", "application/json");

        int http_code = client.POST(data);

        if (http_code > 0)
        {
            String res = client.getString();
            client.end();
            return res;
        }
        else
        {
            JsonDocument res_doc;
            res_doc["success"] = false;
            res_doc["message"] = "Erro na requisição";

            String res;

            serializeJsonPretty(res_doc, res);
            client.end();
            return res;
        }
    }
    else
    {
        JsonDocument res_doc;
        res_doc["success"] = false;
        res_doc["message"] = "Não conectado ao Wifi. Reconectando...";

        String res;

        serializeJsonPretty(res_doc, res);
        WiFi.reconnect();
        return res;
    }
}