// apiService.ts



export async function loginUser({ username, password }: { username: string; password: string }) {
  const response = await fetch('http://localhost:5244/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Giriş işlemi başarısız');
  }
  return await response.json();
}

export async function registerUser({ firstName, lastName, username, password, passwordRepeat }: { firstName: string; lastName: string; username: string; password: string, passwordRepeat: string }) {
  console.log(firstName);
  const response = await fetch('http://10.0.2.2:5244/CreateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: "no-cors",
    body: JSON.stringify({ 
      name: firstName, 
      surname: lastName, 
      username: username, 
      password: password,
    password_r: passwordRepeat }),
  });

  console.log(response.ok);
  if (!response.ok) {
    throw new Error('Kayıt işlemi başarısız');
  }
  return response.ok;

  
}
