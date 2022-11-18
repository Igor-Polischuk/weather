export default async function http<T>(url:string): Promise<T> {
    const response = await fetch(url)
    const data = response.json() as T
    return data
}