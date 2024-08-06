from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
def open_tab(driver):
    driver.get("https://bos.polri.go.id/laporan/dds-warga")

    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="table-dds-warga_length"]/div/div/a')))
    element.click()


def fill_tab1(driver):
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="table-dds-warga_filter"]/label/input')))
    element.send_keys('2021-01-01')
    element = wait.until(EC.element_to_be_clickable((By.XPATH, '//*[@id="table-dds-warga_filter"]/label/input')))
    
