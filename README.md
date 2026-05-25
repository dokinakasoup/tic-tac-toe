# Unbeatable Tic-Tac-Toe AI

A sleek, modern, and completely responsive Tic-Tac-Toe web application built with React and powered by an unbeatable Artificial Intelligence engine using the **Minimax Algorithm with Alpha-Beta Pruning**.

## 🚀 Live Demo
You can play the live version of the game here: **[Insert Your GitHub Pages Link Here]**

---

## ✨ Features
* **Single Player Mode:** Pit your skills against an unbeatable machine intelligence that calculates the absolute best mathematical move.
* **Multiplayer Mode:** Switch modes instantly to play locally on the same device with a friend.
* **Sleek Minimalist UI:** Clean modern design optimized for mobile, tablet, and desktop screens.
* **Performance Optimized:** Leverages structural pruning to bypass unnecessary move computations, keeping the UI completely lag-free.

---

## 🧠 How the AI Works (Alpha-Beta Pruning)

The Single Player mode uses a decision-making game theory algorithm called **Minimax**. The machine simulates every single potential progression of the board to the end of the match. It scores paths leading to an AI victory positively (`+10`) and paths leading to a human victory negatively (`-10`).

To prevent performance lag, **Alpha-Beta Pruning** is integrated to optimize search depth:

* **Alpha ($\alpha$):** The best score that the maximizing player (AI) can guarantee so far.
* **Beta ($\beta$):** The best score that the minimizing player (Human) can guarantee so far.

When the algorithm explores a branch and finds out it is mathematically worse than a branch it already evaluated, it stops searching down that path entirely (a "cutoff"). This eliminates thousands of pointless calculations per turn.

---

## 🛠️ Tech Stack
* **Framework:** React 18+ (Hooks-based architecture)
* **Bundler:** Vite
* **Styling:** Pure CSS3 (Flexbox/Grid layout, Responsive variables)
* **Hosting:** GitHub Pages

---
