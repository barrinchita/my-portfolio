
// calculating a dynamic slidding space for screens based on their innerwidth and returning the exact number of space (margin number) to be used in other to shift cards either to the left or right.

export const sliddingSpace = () => {
    let ncs = Math.floor((window.innerWidth/16)/22);
    let cw = 22;
    return ncs * cw;
}

// noc = number of cards
// tcs = total card space
// ssl = slide space left
// sspc = slidding space per click

export const slide = (noc) => {
    let card = 22;
    let tcs = noc * card;
    let sspc = sliddingSpace();
    let ssl = tcs - sspc;

    return ssl;
}
