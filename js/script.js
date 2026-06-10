console.log("Club website loaded!");
function showYear(year){

    let groups =
    document.querySelectorAll('.member-group');

    groups.forEach(group=>{
        group.style.display = 'none';
    });

    document.getElementById(year)
    .style.display = 'grid';
}
