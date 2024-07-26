
# PlannerApp

PlannerApp is a React Native application designed to help users plan their goals and break them down into smaller, manageable tasks. The app features a goal planner, a quote section for daily inspiration, and a calendar view for easy scheduling. Future plans include expanding the app with social features and AI assistance.

## Features

- **Goal Planning:** Create and manage goals, breaking them down into smaller tasks.
- **Quote Section:** Get daily inspirational quotes to stay motivated.
- **Calendar:** Schedule and view tasks and goals on a calendar.
.

## To-do's:
- **Styling:** The app needs better styling.
- **Atomization:** App components will have to be divided into smaller parts.
- **Future Plans:** Expand the app with social features and AI assistance.

## Screenshots
| Quotes                                            | Tasks                                           | Calendar                                                |
|---------------------------------------------------|-------------------------------------------------|---------------------------------------------------------|
 | ![Quote Screen Screenshot](screenshots/quote.png) | ![Task Screen Screenshot](screenshots/task.png) | ![Calendar Screen Screenshot](screenshots/calendar.png) |

## Prerequisites

- **Node.js**: Version 18 or higher
- **Yarn**: Version 3.6.4
- **Android Studio**: For running the app on Android
- **Environment**: Use this link as reference for setting it up https://reactnative.dev/docs/set-up-your-environment
## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/plannerapp.git
   cd plannerapp
   ```

2. **Install dependencies:**
   ```sh
   yarn install
   ```

## Running the App

### On Android

1. **Start the Metro bundler:**
   ```sh
   yarn start
   ```

2. **Run the app on an Android device/emulator:**
   ```sh
   yarn android
   ```

### On iOS (Optional)

If you plan to run the app on iOS, ensure you have Xcode installed.

1. **Install CocoaPods dependencies:**
   ```sh
   cd ios
   pod install
   cd ..
   ```

2. **Run the app on an iOS device/emulator:**
   ```sh
   yarn ios
   ```

## Testing

Run the test suite using Jest:
```sh
yarn test
```

Generate a test coverage report:
```sh
yarn test:report
```

## Linting and Type Checking

- **Lint the code:**
  ```sh
  yarn lint
  ```

- **Type check the code:**
  ```sh
  yarn type-check
  ```

## Folder Structure

- **/src**: Contains the source code for the app.
- **/assets**: Contains static assets like images and fonts.
- **/ios**: Contains iOS-specific code and configuration.
- **/android**: Contains Android-specific code and configuration.

## Future Plans

- **Social Features:** Enable users to share goals and progress with friends.
- **AI Assistance:** Integrate AI to provide personalized goal recommendations and progress tracking.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

1. **Fork the repository**
2. **Create a new branch (`git checkout -b feature-branch`)**
3. **Commit your changes (`git commit -am 'Add new feature'`)**
4. **Push to the branch (`git push origin feature-branch`)**
5. **Create a new pull request**

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact [wfarat@gmail.com](mailto:wfarat@gmail.com).

---
