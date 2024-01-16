# React + TypeScript + Vite + React Query: Prueba técnica

Esto es una prueba técnica de una empresa europea para un sueldo de 55000 €/anuales.

El objetivo de esta prueba técnica es crear una aplicación similar a la que se proporciona en este enlace: https://midu-react-11.surge.sh/. Para lograr esto, debe usar la API proporcionada por https://randomuser.me/.

Los pasos a seguir:

- [✅] Fetch 100 rows of data using the API.
- [✅] Display the data in a table format, similar to the example.
- [✅] Provide the option to color rows as shown in the example.
- [✅] Allow the data to be sorted by country as demonstrated in the example.
- [✅] Enable the ability to delete a row as shown in the example.
- [✅] Implement a feature that allows the user to restore the initial state, meaning that all deleted rows will be recovered.
- [✅] Handle any potential errors that may occur.
- [✅] Implement a feature that allows the user to filter the data by country.
- [✅] Avoid sorting users again the data when the user is changing filter by country.
- [✅] Sort by clicking on the column header.

## Instalation

```
 $ yarn add -D tailwindcss postcss autoprefixer
 $ yarn tailwindcss init -p
 $ yarn add -D daisyui@latest
 $ yarn add @tanstack/react-query -E
```

## Testing

```
 $ yarn add -D vitest happy-dom @testing-library/react
 $ yarn add -D  @testing-library/jest-dom
```

## Documentation
- [tailwindcss](https://tailwindcss.com/)
- [daisyui](https://daisyui.com/)
- [react-query](https://tanstack.com/query/latest/docs/react/installation)
