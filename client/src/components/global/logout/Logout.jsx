
export const Logout = () => {
    document.cookie = 'authToken=; path=/; max-age=0';
    document.cookie = 'userId=; path=/; max-age=0';
    window.location.href = '/login';
};
