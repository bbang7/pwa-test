// import Image from "next/image";

import Test from "@/_components/Test";

const getDummyData = async () => {
  try {
    const res = await fetch("https://randomuser.me/api?results=500", {
      method: "GET",
    });

    const data = await res.json();
    // console.log("data", data);
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

export default async function Home() {
  const data: User[] = await getDummyData();
  // console.log("in component", data);

  return (
    <div>
      <Test />
      {data.map((item) => (
        <div key={item.login.uuid}>
          {item.name.title} {item.name.first} {item.name.last}
        </div>
      ))}
    </div>
  );
}

type User = {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: string | number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
};
