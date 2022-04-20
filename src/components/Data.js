import { atom, selector, useRecoilState, useRecoilValue } from "recoil";

const userIdState = atom({
  key: "userId",
  default: 1,
});

const userState = selector({
  key: "user",
  get: async ({ get }) => {
    const userId = get(userIdState);
    if (userId === undefined) return;

    const userData = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}`
    ).then((res) => res.json());

    console.log(userData);
    return userData;
  },
});

export default function DataContainer() {
  const [userId, setUserId] = useRecoilState(userIdState);
  const user = useRecoilValue(userState);
  return (
    <>
      <div>
        <select
          value={userId}
          onChange={(e) => {
            const value = e.target.value;
            setUserId(value ? parseInt(value) : undefined);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        {userId !== undefined && (
          <div>
            <p>user Data</p>
            <p>User Nmae {user.name}</p>
            <p>number {user.phone}</p>
          </div>
        )}
      </div>
    </>
  );
}
