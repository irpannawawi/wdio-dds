import pyautogui as gui
import time as t

gui.hotkey('alt', 'tab')
t.sleep(1)
gui.keyDown('shift')

n=0;
while n<112:
	n+=1
	gui.press('down')