import urllib.request
import sys
import os

UNITS_URL = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/lang.vromfs.bin_u/lang/units.csv"
UNITS_MOD = "https://raw.githubusercontent.com/jaek898/wt-localization/main/Modified%20Roundels/units.csv"
UNITS_BASE = "https://raw.githubusercontent.com/jaek898/wt-localization/main/Default%20Roundels/units.csv"
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
lines_mod = fetch_lines(UNITS_MOD)
if lines_mod is None:
    print(f"Failed to fetch {UNITS_MOD}", file=sys.stderr)
    sys.exit(1)

out_dir_1 = os.path.join("WT Localization Files", "Jaek898 Default Roundels")
out_dir_2 = os.path.join("WT Localization Files", "Jaek898 Modified Roundels")
os.makedirs(out_dir_1, exist_ok=True)
os.makedirs(out_dir_2, exist_ok=True)
out_path_1 = os.path.join(out_dir_1, "units.csv")
out_path_2 = os.path.join(out_dir_2, "units.csv")

with open(out_path_1, "w", encoding='utf-8') as outfile1, open(out_path_2, "w", encoding='utf-8') as outfile2:
    names = {}
    full_names = {}
    names_mod = {}
    full_names_mod = {}
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
    for line in lines_mod:
            split = line.split(';')
            if split[0].endswith("_shop"):
                id = split[0][0:-5]
                name_id = split[1]
                names_mod[id] = name_id
            elif split[0].endswith("_0"):
                id = split[0][0:-2]
                name_id = split[1]
                full_names_mod[id] = name_id
    cunit = ""
    cname = ""
    cmod = ""
    for line in lines:
        if line not in ("", "\n"):
            parts = line.split(';')
            parts = [s[1:-1] if s.startswith('"') and s.endswith('"') else s for s in parts]
            parts = [s.replace('""', '"') for s in parts]
            parts_mod = parts.copy()
            if parts[0] != '':
                p2 = parts[0].rsplit('_',1)
                if len(p2) == 2:
                    if p2[1] == "shop":
                        if p2[0] in names:
                            parts[1] = names[p2[0]]
                        if p2[0] in names_mod:
                            parts_mod[1] = names_mod[p2[0]]
                        cunit = p2[0]
                        cname = parts[1]
                        cmod = parts_mod[1]
                    elif p2[1] == '0':
                        if p2[0] in full_names:
                            parts[1] = full_names[p2[0]]
                        if p2[0] in full_names_mod:
                            parts_mod[1] = full_names_mod[p2[0]]
                        if p2[0] != cunit:
                            cunit = p2[0]
                            cname = parts[1]
                            cmod = parts_mod[1]
                    elif p2[0] == cunit and p2[1] in ('1','2'):
                        parts[1] = cname
                        parts_mod[1] = cmod
                if len(parts) >= 2:
                    new_line = ';'.join(parts[:2])
                    new_line_mod = ';'.join(parts_mod[:2])
                else:
                    new_line = line.strip()
                    new_line_mod = line.strip()
                outfile1.write(new_line + '\n')
                outfile2.write(new_line_mod + '\n')