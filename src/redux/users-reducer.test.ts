import usersReducer, { InitialStateType, actions } from "./users-reducer";

// 6. Так как state будет использоваться в каждом тесте - выносим его наружу, а тест будет брать state из замыкания
let state: InitialStateType;
// 7. Так как какой-то из тестов может изменить state перед тем как выполнять action, то, чтобы следующий тест работал с оригинальным InitialState,
// который был изначально, то этот state не инициализируется сразу, а будет инициализироваться перед каждым тестом - beforeEach(callback)
beforeEach(() => {
  state = {
    // 4. Чтобы проверить подписку и отписку от юзера (dispatch action'a) - создаем юзеров
    users: [
      // 4. Чтобы проверить подписку и отписку от юзера (dispatch action'a) - создаем юзеров
      {
        id: 0,
        name: "Dimych 0",
        followed: false,
        photos: { small: null, large: null },
        status: "status 0",
      },
      {
        id: 1,
        name: "Dimych 1",
        followed: false,
        photos: { small: null, large: null },
        status: "status 1",
      },
      {
        id: 2,
        name: "Dimych 2",
        followed: true,
        photos: { small: null, large: null },
        status: "status 2",
      },
      {
        id: 3,
        name: "Dimych 3",
        followed: true,
        photos: { small: null, large: null },
        status: "status 3",
      },
    ],
    totalUsersCount: 0,
    pageSize: 10,
    currentPageNumber: 1,
    isFetching: false,
    followingInProgress: [],
  };
});

test("follow success", () => {
  // 1. Исходные данные (state), приведения 'as' не нужны
  // 2. Делаем action, вызываем reducer
  const newState = usersReducer(state, actions.followSuccess(1)); // 5. Дальше state скармливается reducer'у, а action - для начала будет подписка,
  // результат reducer'a сохраняем в newState

  // 3. Делаем expect
  expect(newState.users[0].followed).toBeFalsy();
  expect(newState.users[1].followed).toBeTruthy();
});

test("unfollow success", () => {
  const newState = usersReducer(state, actions.unfollowSuccess(3))

  expect(newState.users[2].followed).toBeTruthy();
  expect(newState.users[3].followed).toBeFalsy();
});