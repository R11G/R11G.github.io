import urllib.request
import sys

UNITS_URL = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/lang.vromfs.bin_u/lang/units.csv"
WPCOST_URL = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/char.vromfs.bin_u/config/wpcost.blkx"

def fetch_lines(url):
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            data = r.read().decode('utf-8', errors='replace')
            return data.splitlines()
    except Exception:
        return None

name_lines = fetch_lines(UNITS_URL)
data_lines = fetch_lines(WPCOST_URL)

if name_lines is None:
    print(f"Failed to fetch {UNITS_URL}", file=sys.stderr)
    sys.exit(1)

if data_lines is None:
    print(f"Failed to fetch {WPCOST_URL}", file=sys.stderr)
    sys.exit(1)

with open("arbstats/unitsClean.csv", "w", encoding='utf-8') as out:
    ids = {}
    for line in name_lines:
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
    for line in data_lines:
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
            elif line.startswith("    \"repairCostFullUpgradedHistorical"):
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
                cost = line[line.find(':')+3:line.rfind(',')-1]
            elif line.startswith("    \"event"):
                ctype = "LT"
                cost = line[line.find(':')+3:line.rfind(',')-1]
            elif line.startswith("    \"costGold"):
                if ctype == "LT":
                    if cost == "msi_notebook":
                        ctype = "GL"
                    else:
                        continue
                else:
                    ctype = "GE"
                cost = line[line.find(':')+2:line.rfind(',')]
            elif line.startswith("    \"weapons"):
                name = str(ids.get(id))
                if name == "None":
                    if (type == "" and cltype == "human"):
                        type = "human"
                    output[id] = (id, cost+ctype, rp, repair, rcost, slm, rpm, rank, abr, rbr, country, cltype, type)
                elif name != "":
                    if not (id.endswith("_killstreak") or id.endswith("_missile_test") or id.endswith("_event") or id.startswith("nt_") or id.startswith("ucav_") or id.startswith("uav_")):
                        if not name[0].isalnum():
                            if country == "ussr" or country == "usa":
                                name = name[1:]+" ("+country.upper()+")"
                            else:
                                name = name[1:]+" ("+country.capitalize()+")"
                        name = name.replace('""', '"')
                        if (type == "" and cltype == "human"):
                            type = "human"
                        output[id] = (name, cost+ctype, rp, repair, rcost, slm, rpm, rank, abr, rbr, country, cltype, type)
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
    for key, values in output.items():
        line = key + ";" + ";".join(map(str, values)) + "\n"
        out.write(line)