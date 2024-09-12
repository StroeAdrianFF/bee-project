# Bee Game

## Overview

The **Bee Game** is a simple, interactive web application built with Angular that simulates a bee swarm where the user can "hit" bees to reduce their health points (HP). The game involves different types of bees (Queen, Worker, Drone) that take varying damage when hit. The objective is to manage the swarm's health while keeping track of the game status.

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Gameplay Rules](#gameplay-rules)
5. [Development](#development)
6. [Unit Testing](#unit-testing)
7. [Future Improvements](#future-improvements)
8. [License](#license)

## Features

- **Hit Button:** A "Hit" button to damage a random bee in the swarm.
- **Player Name Input:** Ability for the player to enter their name.
- **Bee Health Management:** Bees are grouped by type (Queen, Worker, Drone), each with their own health status.
- **Damage Display:** Shows which bee is hit and the damage inflicted.
- **End Game Scenarios:** The game ends when all bees are dead or the Queen is dead.
- **Game State Persistence:** The game state persists between browser sessions.
- **Game Reset:** Ability to restart the game with default settings after a "Game Over."
- **Unit Tests:** The game functionalities are covered by unit tests written in Jest.

## Installation

To run this application locally, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/StroeAdrianFF/bee-project.git
   cd bee-project
   ```

2. **Install Dependencies:**

   Make sure you have [Node.js](https://nodejs.org/) installed. Then, install the required dependencies:

   ```bash
   npm install
   ```

3. **Run the Application:**

   Start the application in development mode:

   ```bash
   ng serve
   ```

   Open your browser and navigate to `http://localhost:4200`.

## Usage

- Enter the player name in the input field.
- Click the "Hit" button to damage a random bee in the swarm.
- The application will display the type of bee hit and the damage inflicted.
- The game will end when either all bees are dead or the Queen dies.
- Click "Restart" to reinitialize the game with default settings.

## Gameplay Rules

1. **Swarm Composition:**
   - **Queen:** 1 bee with 100 HP
   - **Worker:** 5 bees, each with 75 HP
   - **Drone:** 8 bees, each with 50 HP

2. **Damage Mechanics:**
   - Clicking "Hit" randomly selects a bee type and damages it:
     - **Queen:** 8 damage
     - **Worker:** 10 damage
     - **Drone:** 12 damage
   - When a bee's HP reaches 0, it dies.

3. **Game Over Conditions:**
   - The Queen's HP reaches 0 (all bees die).
   - All bees are dead.

4. **Persistence:**
   - The game's state is saved in `localStorage` to ensure persistence between browser sessions.

5. **Re-initialization:**
   - After "Game Over," click the "Restart" button to reset the game with the original parameters.

## Development

### Built With

- **Angular:** A platform for building mobile and desktop web applications.
- **TypeScript:** A strongly typed programming language that builds on JavaScript.
- **HTML5 & CSS3:** For structuring and styling the game UI.

### Code Organization

- **Components:** Angular components like `BeeContainerComponent`, `PlayerComponent`, etc., are used to manage the UI.
- **Services:** Services such as `BeeService` and `UtilityService` handle game logic, state management, and utility functions.
- **Enums & Interfaces:** TypeScript enums and interfaces are used for defining bee types and their models.

### Adding a New Bee Type

The game is designed to be modular and scalable. Adding a new bee type involves:

1. Updating the `BeeTypeEnum` with the new type.
2. Modifying the relevant services and components to account for the new type and its damage.

## Unit Testing

Unit tests for this application are written in **Jest**. To run the tests, use the following command:

```bash
npm run test
```

Tests cover:

- Component functionality and rendering.
- Service methods and game logic.
- Health management and damage calculation.

Ensure you have Jest and its type definitions installed:

```bash
npm i --save-dev jest @types/jest
```

## Future Improvements

- Add more bee types with different characteristics.
- Enhance the UI with animations and better graphics.
- Implement additional game modes with different difficulty levels.
- Introduce a scoring system and leaderboards.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

