from selenium.webdriver.common.by import By
import time as t
# rajadesa
# sirnabaya 83091356
# tanjungsari 84121472
# sukaharja 86090139
# sirnajaya 01020191 
def login(driver, username, password, captcha):

    username_element = driver.find_element(By.ID, 'username')
    password_element = driver.find_element(By.ID, 'password')
    captcha_element = driver.find_element(By.ID, 'captcha')

    username_element.send_keys(username)
    password_element.send_keys(password)
    captcha_element.send_keys(captcha)
    
    login_button = driver.find_element(By.XPATH, '/html/body/div[3]/div/form/div[4]/button')
    login_button.click()
    
    return "ok"


