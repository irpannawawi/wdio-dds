from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import  time as t
import login as login
import filling

options = Options()
# Add any desired options
driver = webdriver.Firefox()
# setup 
driver.get("https://bos.polri.go.id/login")

username = '83091356'
password = '83091356'
captcha = int(input("Captcha: "))

login.login(driver, username, password, captcha)
filling.open_tab(driver)

filling.fill_tab1(driver)

driver.close()