import json
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup


webdriver_path = '/opt/homebrew/bin/chromedriver'
chrome_options = Options()
chrome_options.add_extension('./Carrot 0.6.6.0.crx')
service = Service(webdriver_path)

first_user_handle = None

def scrape_standings(contest_number, page_number, contest_data, last_user_handle):
    global first_user_handle
    
    url = f'https://codeforces.com/contest/{contest_number}/standings/page/{page_number}'
    
    driver.get(url)
    
    # Implementing waiting logic after accessing 50 pages
    if page_number % 50 == 0:
        time.sleep(300)  # Wait for a minute after every 50 pages
    else:
        time.sleep(3)
    
    html_data = driver.page_source
    soup = BeautifulSoup(html_data, 'html.parser')
    
    participant_rows = soup.find_all('tr', {'participantid': True})
    
    if participant_rows:
        first_user_handle = participant_rows[0].find('a', {'class': 'rated-user'}).text.strip()
    
    if first_user_handle == last_user_handle:
        return True
    
    for row in participant_rows:
        user_handle_tag = row.find('a', {'class': 'rated-user'})
        performance_rating_tag = row.find('td', {'class': 'carrot-final-performance'})
        
        if user_handle_tag and performance_rating_tag:
            user_handle = user_handle_tag.text.strip()
            performance_rating = performance_rating_tag.text.strip()
                
            contest_data['data'].append({
                'handle': user_handle,
                'performanceRating': performance_rating
            })
    
    return False

def main():
    number_of_contests = int(input("Enter the number of contests: "))
    contest_numbers = []

    for _ in range(number_of_contests):
        contest_number = input("Enter the contest number: ")
        contest_numbers.append(contest_number)
    
    global driver
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    for contest_number in contest_numbers:
        json_file_name = f"contest_{contest_number}_standings.json"
        contest_data = {
            'number': int(contest_number),
            'data': []
        }
        
        last_user_handle = None 
        
        for page_number in range(1, 300):
            should_stop = scrape_standings(contest_number, page_number, contest_data, last_user_handle)
            if should_stop:
                break
            last_user_handle = first_user_handle  
        
        with open(json_file_name, 'w') as json_file:
            json.dump(contest_data, json_file, indent=4)
    
    driver.quit()

if __name__ == "__main__":
    main()