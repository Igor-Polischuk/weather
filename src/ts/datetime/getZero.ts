export default function getZero(n: number): string{
    if (n <= 9){
        return `0${n}`
    } else{
        return `${n}`
    }
}