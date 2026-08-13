import urllib.request
import sys
import os

UNITS_URL = "https://raw.githubusercontent.com/gszabi99/War-Thunder-Datamine/master/lang.vromfs.bin_u/lang/units.csv"

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

out_dir = os.path.join("arbstats", "lang")
os.makedirs(out_dir, exist_ok=True)
out_path = os.path.join(out_dir, "units.csv")

with open(out_path, "w", encoding='utf-8') as outfile:
    cunit = ""
    cname = ""
    for line in lines:
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