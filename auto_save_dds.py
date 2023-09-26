import pyautogui as p
import time as t
# n = tgl awal
n=1
p.hotkey('alt', 'tab')

while n <= 21:
    p.hotkey('ctrl', 's')
    t.sleep(1)
    p.press('enter')
    t.sleep(1)
    p.hotkey('ctrl', 'pgdn')
    t.sleep(1)
    n = n+1
