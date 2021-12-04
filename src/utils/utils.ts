export function mapConnectionList<T>(
    f: (connectionItem: any) => T,
    connectionList: { edges: { node: any }[] }
): T[] {
    return connectionList.edges.map((o: { node: any }) => f(o.node))
}
