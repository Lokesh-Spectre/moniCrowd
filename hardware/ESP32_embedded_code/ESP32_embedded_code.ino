#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
// WiFi
//  char *ssid = "ACTFIBERNET"; // Enter your WiFi name
//  char *password = "act12345";  // Enter WiFi password

// MQTT Broker
//  char *mqtt_broker = "192.168.0.107";
const char* topic = "rooms/AB1-202";
const char *mqtt_username = "";
const char *mqtt_password = "";
const int mqtt_port = 1883;

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {

  // pinMode(2,OUTPUT);
    // Set software serial baud to 115200;
    Serial.begin(115200);
    const char* ssid = getLine();
    Serial.println(ssid);
    const char* password = getLine();
    Serial.println(password);
    const char* mqtt_broker = getLine();
    Serial.println(mqtt_broker);
    // Connecting to a WiFi network
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.println("Connecting to WiFi..");
    }
    Serial.println("Connected to the Wi-Fi network");
    //connecting to a mqtt broker
    client.setServer(mqtt_broker, mqtt_port);
    client.setCallback(callback);
    String client_id = "esp32-client-";
    client_id += String(WiFi.macAddress());
    while (!client.connected()) {
        Serial.printf("The client %s connects to the public MQTT broker\n", client_id.c_str());
        if (client.connect(client_id.c_str(), mqtt_username, mqtt_password)) {
            Serial.println("Public EMQX MQTT broker connected");
        } else {
            Serial.print("failed with state ");
            Serial.println(client.state());
            delay(2000);
        }
    }
    // Publish and subscribe
    String msg = "Hi, I'm \"";
    msg+=client_id;
    msg+=String("\"");
    client.publish(topic, msg.c_str());
    client.subscribe(topic);
    digitalWrite(2,(uint8_t) 1);
    delay(500);
    digitalWrite(2,(uint8_t) 0);
    
}

void callback(char *topic, byte *payload, unsigned int length) {

  StaticJsonDocument<200> doc;
  deserializeJson(doc, payload, length);
  uint8_t pin;
  uint8_t state;
  for (JsonPair kv: doc.as<JsonObject>()){
    pin = String(kv.key().c_str()).toInt();
    state = String(kv.value()).equals("HIGH");

    pinMode(pin,OUTPUT);
    digitalWrite(pin,state);
    
    Serial.printf("%d:\t%d\n",pin,state);
  }
  Serial.println("-----------------------");
  Serial.flush();
    // Serial.print("")
    // Serial.print("Message arrived in topic: ");
    // Serial.println(topic);
    // Serial.print("Message:");
    // for (int i = 0; i < length; i++) {
    //     Serial.print((char) payload[i]);
    // }
    // Serial.println();
}

char* getLine(){
  bool t=true;
  String s;
  while (!Serial.available() && t){
    s= Serial.readStringUntil('\n');
    t = s.length()==0;
  }
  int n = s.length();
  char* result = (char*)malloc(n+1);
  if (result!=NULL){
    strcpy(result,s.c_str());
  }
  return result;
}
void loop() {
    client.loop();
}

