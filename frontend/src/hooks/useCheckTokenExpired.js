const useCheckTokenExpired = () => {
    const parseJwt = (token) => {
        try {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
      
          return JSON.parse(jsonPayload);
        } catch (error) {
          return null;
        }
      };
      
      const isTokenExpired = (token) => {
        if (!token) return true;
      
        const decoded = parseJwt(token);
        if (!decoded || !decoded.exp) return true;
      
        const currentTime = Date.now() / 1000; // Current time in seconds
      
        return decoded.exp < currentTime;
      };
      
    return isTokenExpired;
}
 
export default useCheckTokenExpired;