// ВАЖНО! Если в thunk'e диспатчится другая thunk'a - только в этом случае необходимо дождаться результата dispatch'a этой thunk'и.

import { APIResponseType, ResultCodesEnum } from "../api/api";
import { usersAPI } from "../api/users-api";
import { actions, follow, unfollow } from "./users-reducer";

// 1. В тестировании thunk нужно тестировать только thunk'у. Не взаимодействие двух unit'ов (thunk'и и API), не важно , что может быть ошибка.
//    Мы тестируем thunk'у, соответственно нужно сделать это в изоляции. Как? Дальше.
// 2. Во-первых, настоящее API не используется - при вызове thunk'и, thunk'a попытается достучаться до API и сделать настоящий запрос.
//    Создается фейковая API (mock), и когда вызоветсяс thunk'a, она обратится к этой заглушке-API (фейковый {}), а этот фейковый объект
//    надо научить возвращать фейковый рез-т (не нужно делать настоящий запрос).
// То же самое и с dispatch, ведь он принадлежит store'у. Мы не будем трогать store, а то он попытается разбросать входящие в него action'ы
// по reducer'ам. И dispatch настоящий тоже не нужен, не важно, как этот dispatch работает, и куда он по-настоящему action отправляет.
// Нам просто важно знать, что dispatch был вызван какое-то кол-во раз.

jest.mock("../api/users-api"); // 4. импортится API, и оборачивается mock - та самая заглушка-API, fake {}
const usersAPImock = usersAPI as jest.Mocked<typeof usersAPI>; // fake {} и ее типизация

const dispatchMock = jest.fn(); // та самая mock() - fake()
const getStateMock = jest.fn(); // типизация thunk, т.к. thunk'a принимает 3 {}, extraArg - пустой {}

// перед каждым тестом зачищай за собой
beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPImock.followUser.mockClear();
  usersAPImock.unfollowUser.mockClear();
});

const result: APIResponseType = {
  data: {},
  messages: [],
  resultCode: ResultCodesEnum.Success,
};

usersAPImock.followUser.mockReturnValue(Promise.resolve(result)); // 4.1. Если followUser будет вызван - верни Promise, кот. resolve'тся APIResponseType,
// т.к. followUser возвращает APIResponseType
usersAPImock.unfollowUser.mockReturnValue(Promise.resolve(result));

test("success follow thunk", async () => {
  // 3. Поэтому мы для начала создадим fake() для dispatch.
  // 3.1. Исходные, подготовительные данные, как и раньше.

  const thunk = follow(1);

  // 3.2. Дальше непосредственно action

  await thunk(dispatchMock, getStateMock, {}); // не забывать await результат в async (), т.к. нужно делать проверку (toBeCalledTimes), когда мы имеем рез-т async запроса на сервак

  // 3.3. И expect

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1)); // на 1 вызове какой action
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.followSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});

test("success unfollow thunk", async () => {
  // 3. Поэтому мы для начала создадим fake() для dispatch.
  // 3.1. Исходные, подготовительные данные, как и раньше.

  const thunk = unfollow(1);

  // 3.2. Дальше непосредственно action

  await thunk(dispatchMock, getStateMock, {}); // не забывать await результат в async (), т.к. нужно делать проверку (toBeCalledTimes), когда мы имеем рез-т async запроса на сервак

  // 3.3. И expect

  expect(dispatchMock).toBeCalledTimes(3);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1));
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollowSuccess(1));
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1));
});
