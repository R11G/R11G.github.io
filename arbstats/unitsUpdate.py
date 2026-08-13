import urllib.request
import sys
import os

UNITS_URL = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/lang.vromfs.bin_u/lang/units.csv"
UNITS_BASE = "https://raw.githubusercontent.com/jaek898/wt-localization/main/Modified%20Roundels/units.csv"
def fetch_lines(url):
    try:
        with urllib.request.urlopen(url, timeout=30) as r:
            data = r.read().decode('utf-8', errors='replace')
            return data.splitlines()
    except Exception:
        return None

lines = fetch_lines(UNITS_URL)
if lines is None:
    print(f"Failed to fetch {UNITS_URL}", file=sys.stderr)
    sys.exit(1)
lines_base = fetch_lines(UNITS_BASE)
if lines_base is None:
    print(f"Failed to fetch {UNITS_BASE}", file=sys.stderr)
    sys.exit(1)

out_dir = os.path.join("arbstats", "custom")
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "units.csv")

with open(out_path, "w", encoding='utf-8') as outfile:
    names = {}
    full_names = {}
    for line in lines_base:
        split = line.split(';')
        if split[0].endswith("_shop"):
            id = split[0][0:-5]
            name_id = split[1]
            names[id] = name_id
        elif split[0].endswith("_0"):
            id = split[0][0:-2]
            name_id = split[1]
            full_names[id] = name_id
    cunit = ""
    cname = ""
    for line in lines:
        if line not in ("", "\n"):
            parts = line.split(';')
            parts = [s[1:-1] if s.startswith('"') and s.endswith('"') else s for s in parts]
            parts = [s.replace('""', '"') for s in parts]
            if parts[0] != '':
                p2 = parts[0].rsplit('_',1)
                if len(p2) == 2:
                    if p2[1] == "shop":
                        if p2[0] in names:
                            parts[1] = names[p2[0]]
                        cunit = p2[0]
                        cname = parts[1]
                    elif p2[1] == '0':
                        if p2[0] in full_names:
                            parts[1] = full_names[p2[0]]
                        if p2[0] != cunit:
                            cunit = p2[0]
                            cname = parts[1]
                    elif p2[0] == cunit and p2[1] in ('1','2'):
                        parts[1] = cname
                if len(parts) >= 2:
                    new_line = ';'.join(parts[:2])
                else:
                    new_line = line.strip()
                outfile.write(new_line + '\n')