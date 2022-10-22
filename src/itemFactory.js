function* idMaker() {
    let index = 0;
    while (true) {
        yield index++;
    }
}

const newId = idMaker();

export default function(title, hasChildren) {
    return  {
        id: newId.next().value,
        title,
        ...(hasChildren ? { children: [] } : {})
    };
}
