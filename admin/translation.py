import sys
import argparse
import csv
import json

class Handler:

    def __init__(self, lang, output='output.json'):
        self.lang = lang
        self.output = output
        self.data = self.open_json()


    def read(self, key, value):
        serializer = self._get_reader()
        return serializer(key, value)

    def print(self):
        print (self.data)

    def open_json(self):
        with open(self.output, 'r') as outfile:
            data = json.load(outfile)
            outfile.close()
        return data

    def write(self):
        with open(self.output, 'w') as outfile:
            outfile.write(json.dumps(self.data, indent=4, sort_keys=True))

    def _read_french(self, key, value):
        self.data[key.lower()] = value  
    
    def _read_english(self, key, value):
        self.data[key.lower()] = key; 
    
    def _read_default(self, key, value):
        self.data[key.lower()] = ""; 

    def _get_reader(self):
        if self.lang == 'fr':
            return self._read_french
        elif self.lang == 'en':
            return self._read_english
        else:
            return self._read_default
    

def handle (file_name, Handler):
    try:
        with open(file_name) as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=',',  quoting=csv.QUOTE_ALL, skipinitialspace=True)
            for row in csv_reader:
                values = {key.strip().lower():value.strip() for (key,value) in row.items()}
                Handler.read(values['term'], values['translation'])
    except FileNotFoundError:
        raise ValueError("File {} does not exist".format(file_name))
    Handler.write()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('input', help="CSV file being parsed")
    parser.add_argument('output', help="json file being written to")
    parser.add_argument('lang', choices=['fr','en'])
    args = parser.parse_args()
    reader = Handler(args.lang, args.output)
    handle(args.input, reader)
    try: 
        reader = Handler(args.lang, args.output)
        handle(args.input, reader)
    except:
        print ("ERROR", sys.exc_info()[0])



