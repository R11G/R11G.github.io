with open("units.csv", "r", encoding='utf-8') as name, open("wpcost.blkx", "r", encoding='utf-8') as data, open("unitsClean.csv", "w", encoding='utf-8') as out:
    ids = {}
    for line in name:
        split = line.split(';')
        if split[0].endswith("_shop\""):
            id = split[0][1:-6]
            name_id = split[1][1:-1]
            ids[id] = name_id
    in_data = False
    id = ""
    cost = ""
    ctype = ""
    rp = "null"
    repair = "null"
    rcost = "null"
    slm = ""
    rpm = ""
    rank = ""
    abr = ""
    rbr = ""
    country = ""
    type = ""
    cltype = ""
    output = {}
    for line in data:
        if line.startswith("  \""):
            id = line[line.find('"')+1:line.rfind('"')]
            in_data = True
        elif in_data:
            if line.startswith("    \"value"):
                cost = line[line.find(':')+2:line.rfind(',')]
                ctype = "SL"
            elif line.startswith("    \"reqExp"):
                rp = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"repairTimeHrsHistorical"):
                repair = str(float(line[line.find(':')+2:line.rfind(',')])/3)
                if repair == "0.0":
                    repair = "null"
            elif line.startswith("    \"repairCostHistorical"):
                rcost = line[line.find(':')+2:line.rfind(',')]
                if rcost == "0":
                    rcost = "null"
            elif line.startswith("    \"rewardMulHistorical"):
                slm = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"expMul"):
                rpm = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"rank"):
                rank = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"economicRankArcade"):
                abr = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"economicRankHistorical"):
                rbr = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"country"):
                country = line[line.find('_')+1:line.rfind(',')-1]
            elif line.startswith("    \"unitClass"):
                cltype = line[line.find('_')+1:line.rfind(',')-1]
            elif line.startswith("    \"unitMoveType"):
                type = line[line.find(':')+3:line.rfind(',')-1]
            elif line.startswith("    \"gift"):
                ctype = "LT"
                cost = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"event"):
                ctype = "LT"
                cost = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"costGold"):
                if ctype == "LT":
                    ctype = "GL"
                else:
                    ctype = "GE"
                cost = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"weapons"):
                name = ids[id]
                output[id] = (name, cost+ctype, rp, repair, rcost, slm, rpm, rank, abr, rbr, country, cltype, type)
                in_data = False
    for key, values in output.items():
        line = key + ";" + ";".join(map(str, values)) + "\n"
        out.write(line)