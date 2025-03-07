# A program to simulate possible outcomes of The Battle Cats Underground Labyrinth final depth.
# Assumes 0 losses, if losses are to be assumed, reduce starting units by 2 for each loss.

import tkinter as tk
import numpy as np
def run():
    start = int(e1.get())
    units = int(e2.get())
    trials = int(e3.get())
    goal = int(e4.get())
    unitsleft = np.full(trials, units)
    unitsleft -= 10 # ensure 10 units for starting the stage
    floor = np.full(trials, start-1)
    floor += (unitsleft >= 0).astype(int)
    for i in range(start,100):
        if i % 10 == 0 or i == 99: # every 10th floor and B99F
            trap = np.random.randint(7, 10, trials)
        elif i/10 < 3: # B1F to B29F (excluding 10th)
            trap = np.random.randint(3, 6, trials)
        elif i/10 < 6: # B31F to B59F (excluding 10th)
            trap = np.random.randint(4, 7, trials)
        else: # B61F to B98F (excluding 10th)
            trap = np.random.randint(5, 8, trials)
        rescue = np.random.choice([1, 0], size=trials, p=[0.6, 0.4])
        unitsleft += rescue
        unitsleft -= trap
        floor += (unitsleft >= 0).astype(int)
    numgoal = np.sum(floor >= goal)
    display_window = tk.Toplevel(master)
    display_window.title("Statistics")
    tk.Label(display_window, text=f"Maximum floor: B{max(floor)}F").pack(pady=5)
    tk.Label(display_window, text=f"Minimum floor: B{min(floor)}F").pack(pady=5)
    tk.Label(display_window, text=f"Average floor reached: {np.mean(floor)}").pack(pady=5)
    tk.Label(display_window, text=f"B{goal}F reached for {int(numgoal)}/{trials} ({numgoal/trials*100}%) of runs").pack(pady=5)

master = tk.Tk()
master.title("Input Data")
tk.Label(master, text='Current floor (not cleared)').grid(row=0)
tk.Label(master, text='# of units').grid(row=1)
tk.Label(master, text='# of trials').grid(row=2)
tk.Label(master, text='Goal floor').grid(row=3)

e1 = tk.Entry(master)
e2 = tk.Entry(master)
e3 = tk.Entry(master)
e4 = tk.Entry(master)
e1.grid(row=0, column=1)
e2.grid(row=1, column=1)
e3.grid(row=2, column=1)
e4.grid(row=3, column=1)
submit_button = tk.Button(master, text="Run Trials", command=run)
submit_button.grid(row=4, column=1)
tk.mainloop()