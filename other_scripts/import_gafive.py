import logging
import boto3
from botocore.exceptions import ClientError
from time import sleep
import json
import xlrd 
  

def main():

    client = boto3.client('dynamodb')
    tableName = 'GAFiveQList'

    wb = xlrd.open_workbook('~/gafive.xlsx') 
    sheet = wb.sheet_by_index(0) 

    # for j in range(sheet.ncols): 
    #     print((sheet.cell_value(1, j))) 

    for i in range(1, sheet.nrows):

        # for j in range(sheet.ncols): 
        #     print(str(sheet.cell_value(i, j)))

        print (i)
        print (sheet.cell_value(i, 8)) ## Answer D

        idStr = ''
        index = int(sheet.cell_value(i,2))
        if index < 10000 :
            idStr = idStr + '0'
        if index < 1000 :
            idStr = idStr + '0'
        if index < 100 : 
            idStr = idStr + '0'
        if index < 10 :
            idStr = idStr + '0'
        idStr = idStr + str(index)

        # print ("idStr:" + idStr)

        # if sheet.cell_value(i,1) == 4 :
        #    baseStr = ' '
        #else :
        baseStr = sheet.cell_value(i,3)

        hintStr = sheet.cell_value(i,10)

        tranStr = sheet.cell_value(i,11)
        if tranStr == '':
            tranStr = '.'
        
        typeStr = sheet.cell_value(i,8)
        if typeStr == '':
            typeStr = " "

        if hintStr == '' :
            item_key = dict({
                'idx': {
                    'S': 'partitionA',
                },
                'id': {
                    'S': idStr,
                },
                'A': {
                    'S': str(sheet.cell_value(i,4))
                },
                'B': {
                    'S': str(sheet.cell_value(i,5))
                },
                'C': {
                    'S': str(sheet.cell_value(i,6))
                },
                'D': {
                    'S': str(sheet.cell_value(i,7))
                },
                'base': {
                    'S': str(baseStr)
                },
                'Answer': {
                    'S': str(sheet.cell_value(i, 4 + ord(sheet.cell_value(i,9).upper())- ord('A')))
                },
                'type': {
                    'S': typeStr
                },
                'index': {
                    'N': str(i)
                },
                'translation': {
                    'S': tranStr
                }
            }) 
        else :
            item_key = dict({
                    'idx': {
                        'S': 'partitionA',
                    },
                    'id': {
                        'S': idStr,
                    },
                    'A': {
                        'S': str(sheet.cell_value(i,4))
                    },
                    'B': {
                        'S': str(sheet.cell_value(i,5))
                    },
                    'C': {
                        'S': str(sheet.cell_value(i,6))
                    },
                    'D': {
                        'S': str(sheet.cell_value(i,7))
                    },
                    'base': {
                        'S': str(baseStr)
                    },
                    'Answer': {
                        'S': str(sheet.cell_value(i, 4 + ord(sheet.cell_value(i,9).upper())- ord('A')))
                    },
                    'type': {
                        'S': typeStr
                    },
                    'index': {
                        'N': str(i)
                    },
                    'Hint': {
                        'S': str(sheet.cell_value(i,10))
                    },
                    'translation': {
                        'S': tranStr
                    }
                })

        print (item_key)
        response = client.put_item(
            TableName=tableName,
            Item=item_key,
        )
    
        print (response)

if __name__ == '__main__':
    main()
