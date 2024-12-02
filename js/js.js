let readonlyData = document.querySelector('.readonlyData'),
    readonlyRow = document.querySelector('.readonlyRow'),
    readonlyPage = document.querySelector('.readonlyPage'),
    readonlyBtn = document.querySelector('.readonlyBtn'),
    selectMaxRow = document.querySelector('.selectMaxRow'),
    selectMaxBtn = document.querySelector('.selectMaxBtn'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    pageBtn = document.querySelector('.pageBtn'),
    page = document.querySelector('.page'),
    go = document.querySelector('.go'),

    selectBox = document.querySelectorAll('.selectBox'),
    setMax = document.querySelectorAll('.selectMaxRow span, .selectMaxBtn span'),

    btnGroupPage = 1,
    btnActiveIndex = 0;


// 用于测试使用
if(!localStorage.getItem('totalData'))
{
    localStorage.setItem('totalData', 100);
}


if(!localStorage.getItem('setDataRow') && !localStorage.getItem('setBtnGroup'))
{
    localStorage.setItem('setDataRow', 10);
    localStorage.setItem('setBtnGroup', 6);
}
for(let i = 0; i < selectBox.length; i++)
{
    let maxRow_maxBtn = selectBox[i].querySelector('.selectMaxRow, .selectMaxBtn'),
        arrow = selectBox[i].querySelector('.arrow');

    selectBox[i].onclick = function()
    {
        selectBox[i].classList.toggle('selectBox_radius');
        maxRow_maxBtn.classList.toggle('maxRow_maxBtn');
        arrow.classList.toggle('arrow_deg');
    }
}
selectMaxRow.onclick = function(e)
{
    if(e.target.matches('.selectMaxRow span'))
    {
        readonlyRow.textContent = e.target.innerText;
        localStorage.setItem('setDataRow', parseInt(e.target.innerText, 10));

        showReadonly();
        btnGroupPage = 1;
        btnActiveIndex = 0;
        showBtn();
        currentPage();
    }
}
selectMaxBtn.onclick = function(e)
{
    if(e.target.matches('.selectMaxBtn span'))
    {
        readonlyBtn.textContent = e.target.innerText;
        localStorage.setItem('setBtnGroup', parseInt(e.target.innerText, 10));

        showColor();
        let setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),
            page = parseInt(document.querySelector('.active').innerText, 10);
        btnGroupPage = Math.ceil(page / setBtnGroup);
        btnActiveIndex = (page - 1) % setBtnGroup;
        showBtn();
    }
}
prev.onclick = function()
{
    updatePagination(false);
}
next.onclick = function()
{
    updatePagination(true);
}
pageBtn.onclick = function(e)
{
    let setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10);

    if(e.target.matches('.pageBtn span'))
    {
        document.querySelector('.active').classList.remove('active');
        e.target.classList.add('active');

        btnActiveIndex = parseInt(e.target.innerText, 10) - (btnGroupPage - 1) * setBtnGroup - 1;
        updateBtnState();
        currentPage();
    }
}
go.onclick = function()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),
        totalData = parseInt(localStorage.getItem('totalData'), 10),
        totalPage = Math.ceil(totalData / setDataRow);

    if(parseInt(page.value, 10) >= 1 && parseInt(page.value, 10) <= totalPage)
    {
        btnGroupPage = Math.ceil(parseInt(page.value, 10) / setBtnGroup);
        btnActiveIndex = (parseInt(page.value, 10) - 1) % setBtnGroup;
        showBtn();
        currentPage();
    }
    else
    {
        console.log(totalPage > 1 ? `请输入1到${totalPage}之间的有效页码！` : '只有一页，无需输入！');
    }
    page.value = '';
}

function showReadonly()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),
        totalData = parseInt(localStorage.getItem('totalData'), 10),
        totalPage = Math.ceil(totalData / setDataRow);

    readonlyData.textContent = `共${totalData}条`;
    readonlyRow.textContent = `${setDataRow}条/页`;
    readonlyPage.textContent = `共${totalPage}页`;
    readonlyBtn.textContent = `${setBtnGroup}个/组按钮`;
    showColor();
}
function showColor()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10);

    for(let i = 0; i < setMax.length; i++)
    {
        setMax[i].style.color = parseInt(setMax[i].innerText, 10) === setDataRow || parseInt(setMax[i].innerText, 10) === setBtnGroup ? '#ff6f66' : 'white';
    }
}
function showBtn()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),
        totalData = parseInt(localStorage.getItem('totalData'), 10),
        totalPage = Math.ceil(totalData / setDataRow),

        startNumber = (btnGroupPage - 1) * setBtnGroup + 1;
        endNumber = Math.min(startNumber + setBtnGroup - 1, totalPage);

    pageBtn.innerHTML = '';
    for(let i = startNumber; i <= endNumber; i++)
    {
        let span = document.createElement('span');
            span.textContent = i;
        if(i === startNumber + btnActiveIndex)
        {
            span.classList.add('active');
        }
        pageBtn.appendChild(span);
    }
    updateBtnState();
}
function updateBtnState()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),
        totalData = parseInt(localStorage.getItem('totalData'), 10),
        totalPage = Math.ceil(totalData / setDataRow),

        startNumber = (btnGroupPage - 1) * setBtnGroup + 1;

    prev.disabled = (startNumber + btnActiveIndex === 1);
    next.disabled = (startNumber + btnActiveIndex === totalPage);
}
function updatePagination(boolean)
{
    let setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10);

    if(boolean)
    {
        if(btnActiveIndex < setBtnGroup - 1)
        {
            btnActiveIndex++;
        }
        else
        {
            btnGroupPage++;
            btnActiveIndex = 0;
        }
    }
    else
    {
        if(btnActiveIndex > 0)
        {
            btnActiveIndex--;
        }
        else
        {
            btnGroupPage--;
            btnActiveIndex = setBtnGroup - 1;
        }
    }
    showBtn();
    currentPage();
}
function currentPage()
{
    let setDataRow = parseInt(localStorage.getItem('setDataRow'), 10),
        setBtnGroup = parseInt(localStorage.getItem('setBtnGroup'), 10),

        startNumber = (btnGroupPage - 1) * setBtnGroup + 1,
        currentPage = startNumber + btnActiveIndex;

    console.log(`当前页：${currentPage}，请求数据${setDataRow}条/页`);
}








showReadonly();
showBtn();