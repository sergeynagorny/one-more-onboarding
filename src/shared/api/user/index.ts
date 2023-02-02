type User = {
    userName: string;
};

export const getUser = (): Promise<User> => {
    return new Promise((r) => setTimeout(() => r({ userName: 'admin' }), 1000));
};
