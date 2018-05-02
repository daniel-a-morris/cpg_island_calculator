#!/usr/local/bin/python3

import cgi, json
import os
import cgitb
cgitb.enable(display=0, logdir="log/")

def main():
    print("Content-Type: application/json\n\n")
    form = cgi.FieldStorage()
    sequence = form.getvalue('dna_seq')
    frame = form.getvalue('frame_size')
    frame = int(frame)
    threshold = form.getvalue('oe_ratio')
    threshold = float(threshold)
    results = { 'match_count': 0, 'matches': list() }
    c = 0
    g = 0
    cpg = 0
    for i in range(0,len(sequence)-frame):
        temp = sequence[i:i+frame]
        for j in range(0,frame):
            if temp[j] == 'C':
                c += 1
                if j < frame-1:
                    if(temp[j+1] == 'G'):
                        cpg += 1
            elif temp[j] == 'G':
                g += 1
            else:
                continue
        per = (c+g)/(frame/100)
        ratio = (cpg*frame)/(c*g)
        if(ratio >= threshold and per >= 50):
            results['match_count'] += 1
            results['matches'].append({'start': (i+1),'end': (i+frame),'count':cpg,'percent':per,'ratio':ratio})
        c = 0
        g = 0
        cpg = 0
    print(json.dumps(results))

if __name__ == '__main__':
    main()
