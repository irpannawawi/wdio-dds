import pyautogui
import time as t
# n = tgl awal
n=1
pyautogui.hotkey('alt', 'tab')
libur = [7,14,21,28]
while n <= 5:
    if n in libur:
        n+=1
        continue
    else:
        tgl = '2024-04-'
        if(len(str(n))<2):
            tgl = tgl+'0'+str(n)
        else:
            tgl = tgl+str(n)

        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) #  type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        pyautogui.write(tgl) # type: ignore
        pyautogui.press('enter')
        n+=1
