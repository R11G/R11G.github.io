with open("units.csv", "r", encoding='utf-8') as infile, open("units2.csv", "w", encoding='utf-8') as outfile:
    cunit = ""
    cname = ""
    for line in infile:
        if line not in ("", "\n"):
            parts = line.split(';')
            if parts[0] != '"':
                if parts[0].startswith('"') and parts[0].endswith('"'):
                    tmp = parts[0][1:-1]
                p2 = tmp.rsplit('_',1)
                if len(p2) == 2:
                    if p2[1] == "shop":
                        cunit = p2[0]
                        cname = parts[1]
                    elif p2[0] != cunit and p2[1] == '0':
                        cunit = p2[0]
                        cname = parts[1]
                    elif p2[0] == cunit and p2[1] in ('1','2'):
                        parts[1] = cname
                if len(parts) >= 2:
                    new_line = ';'.join(parts[:2])
                else:
                    new_line = line.strip()
                outfile.write(new_line + '\n')