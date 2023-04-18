import { useState, useCallback } from 'react';

const useCheckValidate = (password:string, email:string) => {
  const [isReady, setIsReady] = useState(false);

  const handleCheckValidate = useCallback(() => {
    if (password.length >= 8 && email.includes('@')) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [password, email]);

  return { isReady, handleCheckValidate };
};

export default useCheckValidate;