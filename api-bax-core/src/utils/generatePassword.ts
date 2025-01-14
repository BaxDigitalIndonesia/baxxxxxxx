//  function GenerateRandomPassword(): string {
//     const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
//     let password = "";

//     // Pastikan password memiliki panjang minimal 8 karakter
//     for (let i = 0; i < 8; i++) {
//         password += charset.charAt(Math.floor(Math.random() * charset.length));
//     }

//     // Menambahkan simbol agar password memenuhi syarat
//     const symbols = "!@#$%^&*()_+";
//     password += symbols.charAt(Math.floor(Math.random() * symbols.length));

//     // Mengacak password untuk memastikan lebih acak
//     password = password.split('').sort(() => Math.random() - 0.5).join('');

//     // Memastikan panjang password tidak lebih dari 20 karakter
//     return password.substring(0, 20);
// }

export function GenerateRandomPassword() {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "@$!%*?&"; // Hanya simbol yang diizinkan oleh regex
  
    const allCharacters = uppercase + lowercase + numbers + symbols;
    const passwordLength = Math.floor(Math.random() * (20 - 8 + 1)) + 8; // Random length between 8 and 20
  
    let password = "";
    
    // Ensure at least one character from each required set
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
  
    // Fill the rest of the password length with random characters
    while (password.length < passwordLength) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }
  
    // Shuffle the password to randomize the order
    password = password.split('').sort(() => Math.random() - 0.5).join('');
  
    return password;
  }
  
 
  