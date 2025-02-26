import java.util.*;
import java.io.*;
public class Main {
    public static void main(String[] args) throws IOException {
        File myFile = new File("src/wpcost.blkx");
        Scanner myReader = new Scanner(myFile);
        ArrayList<String[]> format = new ArrayList<>();
        String[] add = new String[13];
        double repairS = 0;
        double repairF = 0;
        double repairT = 0;
        while (myReader.hasNextLine()) {
            String data = myReader.nextLine();
            if (data.startsWith("  \"")) {
                if (!data.contains("economicRankMax")) {
                    add[0] = data.substring(data.indexOf("\"") + 1, data.indexOf("\"", data.indexOf("\"") + 1));
                }
            } else if (data.startsWith("    \"")) {
                String cmp = data.substring(5);
                if (cmp.startsWith("value")) {
                    add[1] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")) + "SL";
                } else if (cmp.startsWith("reqExp")) {
                    add[2] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("repairTimeHrsHistorical")) {
                    repairT = Double.parseDouble(cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")));
                } else if (cmp.startsWith("repairCostHistorical")) {
                    repairS = Double.parseDouble(cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")));
                } else if (cmp.startsWith("repairCostFullUpgradedHistorical")) {
                    add[4] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                    repairF = Double.parseDouble(cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")));
                    add[3] = Double.toString(repairT * repairF / repairS);
                } else if (cmp.startsWith("rewardMulHistorical")) {
                    add[5] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("expMul")) {
                    add[6] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("rank")) {
                    add[7] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("economicRankArcade")) {
                    add[8] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("economicRankHistorical")) {
                    add[9] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(","));
                } else if (cmp.startsWith("country")) {
                    add[10] = cmp.substring(cmp.indexOf("_") + 1, cmp.indexOf(",") - 1);
                } else if (cmp.startsWith("unitClass")) {
                    add[11] = cmp.substring(cmp.indexOf("_") + 1, cmp.indexOf(",") - 1);
                } else if (cmp.startsWith("unitMoveType")) {
                    add[12] = cmp.substring(cmp.indexOf(":") + 3, cmp.indexOf(",") - 1);
                } else if (cmp.startsWith("costGold")) {
                    if (add[1].equals("0SL")) {
                        add[1] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")) + "GE";
                    }
                    if (add[1].equals("msi_notebookLT")) {
                        add[1] = cmp.substring(cmp.indexOf(":") + 2, cmp.indexOf(",")) + "GL";
                    }
                } else if (cmp.startsWith("gift")) {
                    add[1] = cmp.substring(cmp.indexOf(":") + 3, cmp.indexOf(",") - 1) + "LT";
                } else if (cmp.startsWith("event")) {
                    add[1] = cmp.substring(cmp.indexOf(":") + 3, cmp.indexOf(",") - 1) + "LT";
                } else if (cmp.startsWith("weapons\":")) {
                    if (add[0] != null) {
                        format.add(add);
                        add = new String[13];
                    }
                }
            }
        }
        myReader.close();
        File myFile2 = new File("src/units.csv");
        ArrayList<String> stats = new ArrayList<>();
        Scanner myReader2 = new Scanner(myFile2);
        while (myReader2.hasNextLine()) {
            String data = myReader2.nextLine();
            if (data.indexOf('\"', 1) >= 1) {
                String test = data.substring(1, data.indexOf('\"', 1));
                if (test.contains("_shop")) {
                    if (!test.contains("killstreak") && !test.contains("tutorial") && !test.contains("yt_cup_2019") && !test.contains("_race") && !test.contains("_event") && !test.contains("_naval")) {
                        String data2 = data.substring(1, data.indexOf('\"', 1) - 5) + ";";
                        if (data.indexOf('\"', data.indexOf(";") + 2) >= 0) {
                            data2 += data.substring(data.indexOf(";") + 2, data.indexOf(';', data.indexOf(";") + 1) - 1);
                            stats.add(data2);
                        }
                    }
                }
            }
        }
        myReader2.close();
        ArrayList<String[]> combine = new ArrayList<>();
        for (String[] strings : format) {
            String cur = strings[0];
            for (int j = 0; j < stats.size(); j++) {
                if (cur.equals(stats.get(j).substring(0, stats.get(j).indexOf(';')))) {
                    String[] combined = new String[13];
                    String name = stats.get(j);
                    for (int l = 0; l < name.length(); l++) {
                        if (name.charAt(l) > 160) {
                            if (name.charAt(l) == '␠' ||
                                    name.charAt(l) == '▅' ||
                                    name.charAt(l) == '▄' ||
                                    name.charAt(l) == '␗' ||
                                    name.charAt(l) == '◊' ||
                                    name.charAt(l) == '◄' ||
                                    name.charAt(l) == '▀' ||
                                    name.charAt(l) == '\uF059' ||
                                    name.charAt(l) == '▂' ||
                                    name.charAt(l) == '▃' ||
                                    name.charAt(l) == '◐' ||
                                    name.charAt(l) == '◌') {
                                name = name.substring(0, l) + name.substring(l + 1);
                                String country = strings[10];
                                switch (country) {
                                    case "britain" -> name += " (Great Britain)";
                                    case "china" -> name += " (China)";
                                    case "france" -> name += " (France)";
                                    case "germany" -> name += " (Germany)";
                                    case "israel" -> name += " (Israel)";
                                    case "italy" -> name += " (Italy)";
                                    case "japan" -> name += " (Japan)";
                                    case "sweden" -> name += " (Sweden)";
                                    case "usa" -> name += " (USA)";
                                    case "ussr" -> name += " (USSR)";
                                }
                            }
                        }
                    }
                    name = name.replace("\"\"", "\"");
                    combined[0] = name;
                    System.arraycopy(strings, 1, combined, 1, 12);
                    stats.remove(j);
                    combine.add(combined);
                    break;
                }
            }
        }
        FileWriter w = new FileWriter("src/unitsClean.csv");
        for (String[] strings : combine) {
            StringBuilder write = new StringBuilder();
            for (int j = 0; j < 13; j++) {
                write.append(strings[j]).append(";");
            }
            String out = write.toString();
            out = out.substring(0, out.length() - 1);
            w.write(out + "\n");
        }
        w.close();
    }
}