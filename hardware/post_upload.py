import serial
import subprocess
import socket
import time
wifi = subprocess.check_output(['netsh', 'WLAN', 'show', 'interfaces'])
SSID = [x.partition(":")[-1].strip() for x in wifi.decode('utf-8').split("\n") if "SSID" in x][0]

wifi = subprocess.check_output(['netsh', 'WLAN', 'show', 'profile',SSID, "key=clear"])
passwd = [line.partition(":")[-1].strip() for line in wifi.decode("utf-8").split("\n") if "Key Content" in line][0]
del wifi

ip = socket.gethostbyname(socket.gethostname())
print(f"SSID:\t{SSID}\npasswd:\t{passwd}\nIP:\t{ip}")
# exit()
comPort = "COM8"
baudrate = 115200
s = serial.Serial(comPort, baudrate, timeout=0.5)
# SSID = "ACTFIBERNET\n"
# passwd = "act12345\n"
# ip = "192.168.0.107"
SSID+="\n"
passwd+="\n"
ip+="\n"
s.write(SSID.encode())
# s.write("\n".encode())
time.sleep(0.5)
s.write(passwd.encode())
# s.write("\n".encode())
time.sleep(0.5)

s.write(ip.encode())
# s.write("\n".encode())
time.sleep(0.5)

while True:
	line = s.readline()
	if line:
		print(line.decode(),end="")
s.close()
print("Written successfully")