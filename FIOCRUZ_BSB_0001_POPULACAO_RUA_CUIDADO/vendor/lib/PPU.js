/* PPU 07/2021 */

/* Numeração dos módulos (manter 0)*/
const arrayModule = [0, 11, 25, 41, 51, 69, 82, 92, 105, 125];
/* Numeração das páginas de exercícios (manter 0)*/
let arrayExercise = [0, 10, 23, 39, 49, 67, 80, 90, 104, 122];
/* Nome dos exercícios */
const arrayScore = ['EX1', 'EX2', 'EX3', 'EX4', 'EX5', 'EX6', 'EX7', 'EX8', 'EX9'];
/* Breadcrumb */
const arrayBreadCrumb1 = [
    'O acolhimento e o vínculo junto à PSR',
    'O acolhimento e o vínculo junto à PSR',
    'O acolhimento e o vínculo junto à PSR',
    'Matriciamento',
    'Matriciamento',
    'Organização do serviço com Baixa Exigência',
    'Organização do serviço com Baixa Exigência',
    'Organização do serviço com Baixa Exigência',
    'Estratégias de adesão'
]
const arrayBreadCrumb2 = [
    'Acolhimento e técnicas de escuta',
    'Acolhimento e vínculo como estratégias de cuidado',
    'Acolhimento como organizador da clínica e do serviço',
    'O que é o Matriciamento?',
    'Como se opera a lógica de trabalho baseada no Matriciamento?',
    'O que é um serviço de Baixa Exigência?',
    'Como construir pactuações e regras coletivas?',
    'Modos de flexibilizar as ofertas em saúde​',
    'Conceito de Redução de Danos'
];
/* Numeração inicial do módulo */
const last_page = arrayModule[arrayModule.length - 1];
/* Número inicial dos módulos */
let num_modulo = arrayModule[1];
/* Número inicial da página */
let page_display = 1;

function init(){
    unasus.pack.initialize();
    let status = unasus.pack.getStatus();
    if (status === undefined){
        status = createStatusDefault();
    }
    if(status === null){
        return false;
    }
}
function createStatusDefault(){
    let status = {};
    status.status = "attended";
    status.percentage = 0;
    status.adjustPerc = 0;
    status.LTIvalue = 0;

    /* Módulo 2 - Tópico 1 */
    status['EX1'] = {'1': false};

    /* Módulo 2 - Tópico 2 */
    status['EX2'] = {'1': false};
    
    /* Módulo 2 - Tópico 3 */
    status['EX3'] = {'1': false};

    /* Módulo 2 - Tópico 4 */
    status['EX4'] = {'1': false};

    /* Módulo 2 - Tópico 5 */
    status['EX5'] = {'1': false};

    /* Módulo 2 - Tópico 6 */
    status['EX6'] = {'1': false};
    
    /* Módulo 2 - Tópico 7 */
    status['EX7'] = {'1': false};

    /* Módulo 2 - Tópico 8 */
    status['EX8'] = {'1': false};

    /* Módulo 2 - Tópico 9 */
    status['EX9'] = {'1': false};

    status.Pages = {'1': false, '2': false, '3': false, '4': false, '5': false, '6': false, '7': false, '8': false, '9': false, '10': false, '11': false, '12': false, 
    '13': false, '14': false, '15': false,'16': false, '17': false, '18': false, '19': false, '20': false, '21': false, '22': false, '23': false, '24': false, '25': false, 
    '26': false, '27': false, '28': false, '29': false, '30': false, '31': false, '32': false, '33': false, '34': false, '35': false, '36': false, '37': false, '38': false, '39': false, '40': false,
    '41': false, '42': false, '43': false, '44': false, '45': false, '46': false, '47': false, '48': false, '49': false, '50': false, '51': false, '52': false, '53': false, 
    '54': false, '55': false, '56': false,'57': false, '58': false, '59': false, '60': false, '61': false, '62': false, '63': false, '64': false, '65': false, '66': false, 
    '67': false, '68': false, '69': false, '70': false, '71': false, '72': false, '73': false, '74': false, '75': false, '76': false, '77': false, '78': false, '79': false, '80': false, '81': false,
    '82': false, '83': false, '84': false, '85': false, '86': false, '87': false, '88': false, '89': false, '90': false, '91': false, '92': false, '93': false, '94': false, '95': false, '96': false,
    '97': false, '98': false, '99': false, '100': false, '101': false, '102': false, '103': false, '104': false, '105': false, '106': false, '107': false, '108': false, '109': false, '110': false, '111': false,
    '112': false, '113': false, '114': false, '115': false, '116': false, '117': false, '118': false, '119': false, '120': false, '121': false, '122': false, '123': false, '124': false, '125': false};

    status.modules = {'1': false, '2': false, '3': false, '4': false, '5': false, '6': false};

    status.currentPage = {'current': 0};

    unasus.pack.setStatus(status);

    return status;
}
function stepNavigation(page) {
    let status = unasus.pack.getStatus();
    let pagination = indexPage(page);
    loadPage(pagination);
    updatePage(pagination, status); 
    checkModules(status);
    markMenu(status);
}
function indexPage(c_page){
    let find = c_page.substr(0, 1);
    let pagination;
    if (find == 'c') { 
        pagination = c_page.substr(1, c_page.length - 1); 
        pagination = parseInt(pagination);
    } else { 
        pagination = c_page; 
        pagination = parseInt(pagination);
    }
    return pagination;
}
function loadPage(page){
    $('page').load('c'+page + '.html', function () {
        addhighlight();
        displayPage();
        applyZoom();
        activeClass('c'+page);
    });
}
function updatePage(page, status){
    statusPPU = status;
    for(let m = 1; m < arrayModule.length; m++){
        moduleVerify(page, m, arrayModule[m - 1], arrayModule[m], status);
    }
    if(!verifyPageExer(page)){
        if(status.percentage <= 100 && page >= 1 && page <= last_page){
            increasePerc(page, 0, statusPPU);
        }
    }
    updatePerc(statusPPU);
}
function moduleVerify(page, index_module, module_init, module_finish, statusPPU){
    let status = statusPPU;
    if(page > module_init && page <= module_finish){
        if (page === last_page) {
            $('.current-page').html('Créditos');
            removedMenu(0);
        } else{
            removedMenu(index_module);
            $('.current-breadcrumb').html(arrayBreadCrumb1[index_module - 1]);
            $('.current-page').html(arrayBreadCrumb2[index_module - 1]);
            choosedMenu('#topico'+index_module,'#menu0'+index_module,'#menu-topico-'+index_module);
        }
        page_display = page - module_init;
        num_modulo = module_finish - module_init;
        stepBackNumber = page - 1;
        stepForwardNumber = page + 1;
        }
    else{
        if(page === 0){
            $('.current-page').html('Personagens');
            removedMenu(0);
            if (!(currentPage(status) < last_page)) {
                if (currentPage(status) === 1) {
                  stepBackNumber = 1;
                } else {
                  stepForwardNumber = last_page;
                }
            }
        } 
    } 
}
function currentPage(status){
    let currentPageOf = status.currentPage['current'];
    let currentInt = parseInt(currentPageOf);
    return currentInt;
}
function verifyPageExer(page){
    let exists = 0;
    arrayExercise.forEach(pag => {
        if(pag === page){
            exists = 1;
        } 
    });
    return exists;
}
function increasePerc(page, type, statusPPU){
    let status = statusPPU;
    let valorPage = 100/last_page;
    if(status.Pages[page] === false || type === 1){
        adjustPerc = valorPage + status.adjustPerc;
        //porcentagem = Math.ceil(adjustPerc);
        porcentagem = adjustPerc;
        status.percentage = parseInt(porcentagem);
        status.adjustPerc = adjustPerc;
    }
    increasePage(page, status);
}
function increasePage(page, statusPPU){
    let status = statusPPU;
    status.currentPage['current'] = page;
    if(!status.Pages[page] && status.percentage <= 100){
        status.Pages[page]= true;
        unasus.pack.setStatus(status);
    }
    if(checkCompleted(0, last_page, status)){
        if(status.LTIvalue === 1) {
            status.status = "completed";
        }
        status.percentage = 100;
        unasus.pack.setStatus(status);
    }
}
function updatePerc(status){
    if (unasus.pack.initialize()) {
        let perc = status.percentage;
        let elem = document.getElementById("status_percentage");
        $('.progress-bar').css('width', perc+'%').attr('aria-valuenow', perc);  
        elem.innerHTML = perc + '%';
    }
}
function checkModules(statusPPU){
    let status = statusPPU;
    for(let m = 1; m < arrayModule.length; m++){
        if(checkCompleted(arrayModule[m - 1], arrayModule[m], status)){
            if(status['EX'+m]){
                if(!status.modules[m]){
                    $('#menu0'+m).addClass('fas fa-check');
                    status.modules[m] = 'true';
                    unasus.pack.setStatus(status);
                }
            }
        }
    }
}
function checkCompleted(value_init, value_finish, status){
    value_init = value_init + 1; 
    for(let i=value_init;i<=value_finish;i++){
        if(!status.Pages[i]){
            return 0;
        }
    }
    return 1;
}
function markMenu(statusPPU){
    let status = statusPPU;
    let listMenu = document.querySelectorAll('.menu-topico li');
    let arrayCheckMenu = [];
    let n = 0;
    for(let i=0; i<listMenu.length; i++) {
        let item = listMenu[i].id;
        arrayCheckMenu[n] = indexPage(item);
        n++;
    }
    for(let q=0;q<arrayCheckMenu.length; q++){
        let itemMenu = arrayCheckMenu[q];
        if(status.Pages[itemMenu] && (!$('#c'+itemMenu+' i').hasClass('fa-check'))){
            if(itemMenu !== last_page){
                $('#' + 'c'+itemMenu).prepend('<i class="fas fa-check">');
            }
        }
    }
}
//Exercícios
function updateExer(exercise, page){
    let status = unasus.pack.getStatus();
    if(!status[exercise][1]){
        status[exercise][1] = true;
        status.Pages[page] = true;
        increasePerc(page, 1, status);
        checkModules(status);
    }
    updateLTI(status);
}
function updateLTI(status){
    let lti = 0.0;
    arrayScore.forEach(ex => {
        let score = (checkNote(ex, status) / 9);
        lti += score;
    });
    status.LTIvalue = parseFloat((lti).toFixed(3));
    unasus.pack.setStatus(status);
}
function checkNote(exercise, status){
    let cont = 0;
    if(status[exercise][1]){
        cont++;
    }
    return cont;
}
$(function () {
    init();
});