class Module
{
    constructor(param ,count)
    {
        this.Material1List = [];
        this.Material2List = [];
        this.Material3List = [];
        this.Material4List = [];
        this.Material0List = [];

        this.Mcount= count;
        this.Parameters= param;
        this.checkRestrictions();
        this.setDetails();
        this.setName();
    }
    Mcount;
    Material1List;
    Material2List;
    Material3List;
    Material4List;
    Material0List;
    Name;
    Parameters;
    checkRestrictions()
    {

    }
    setDetails()
    {

    }
    setName()
    {

    }
    Edit(param)
    {
        this.Material1List = [];
        this.Material2List = [];
        this.Material3List = [];
        this.Material4List = [];
        this.Material0List = [];
        this.Parameters = param;
        this.checkRestrictions();
        this.setName();
        this.setDetails();
    }
    getDetails(material)
    {
        switch (material)
        {
            case 0:
                return this.Material0List;
            case 1:
                return this.Material1List;
            case 2:
                return this.Material2List;
            case 3:
                return this.Material3List;
            case 4:
                return this.Material4List;
            default:
                return this.Material0List;
        }
    }

}
function newDetail(name, length, width, count,k)
{
   return {
    length : length,
    width : width,
    count : count,
    k : k,
    texture : ``,
    name : name,
    kr : ``,
   }
}

const getModule=(name,param,count)=>{
    switch(name){
        case `NM_RL`:
            return new NM_RL(param,count);
        case `NM_YA`:
            return new NM_YA(param,count);
        case `NM_M`:
            return new NM_M(param,count);
        case `NM_DH`:
            return new NM_DH(param,count);
        case `NM_PM`:
            return new NM_PM(param,count);
        case `NMK`:
            return new NMK(param,count);
        case `NMY_M`:
            return new NMY_M(param,count);
        case `VM`:
            return new VM(param,count);
        case `VM_VT`:
            return new VM_VT(param,count);
        case `VM_V`:
            return new VM_V(param,count);
        case `VM_K`:
            return new VM_K(param,count);
        default:
            return new NM_RL(param,count);
    }
}
export default getModule;

class NM_RL extends Module
{
    setName()
    {
        this.Name = `НМ${this.Mcount}-РЛ ${this.Parameters[0]}x${this.Parameters[1]} ${this.Parameters[2]} полк. ${(this.Parameters[6] ? `gola` : ``)} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - кількість полок 
         * 3 - матеріал корпусу 
         * 4 - матеріал фасаду 
         * 5 - Боковина видима
         * 6 - Gola
         * 7 - Один фасад
         */

        if (this.Parameters[7])
        {
            this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[6]  ? 130 : 100), this.Parameters[1], 1, [2, 2, 2, 2 ]));
        }
        else
        {
            this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[6]  ? 130 : 100), this.Parameters[1]/2, 2, [ 2, 2, 2, 2 ]));
        }

        this.getDetails((this.Parameters[5] ? this.Parameters[4] : this.Parameters[3])).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, 
            this.Parameters[0] - (this.Parameters[5] ? 0 : 118), 
            535, 1, [2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 535, 1, [2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] - (this.Parameters[5] ? 18 : 0), 535, 1, [ 2, 1, 1, 1 ]));
        if (this.Parameters[2] > 0)
        {
            this.getDetails(this.Parameters[3]).push(newDetail(
                `M${this.Mcount} Н Полка`, 
                this.Parameters[1] - 38, 
                535, 
                this.Parameters[2], 
                [2, 1, 1, 1 ]));
        }
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, 1, [1, 1, 1, 1 ]));


        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] - 100, this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
    }
}
class NM_YA extends Module
{
    checkRestrictions()
    {
        // Якщо полка не 3 то ставим рівність фасадів на 0
        if (this.Parameters[2] !== 3)
        {
            this.Parameters[7] = 0;

        }
        // Якщо 4 полок , то вимикаємо gola
        if (this.Parameters[2] === 4)
        {
            this.Parameters[6] = 0;
        }
    }
    setName()
    {
        this.Name = `НМ${this.Mcount}-Я${this.Parameters[2]}${(this.Parameters[7] ? `_Р` : ``)} ${this.Parameters[0]}x${this.Parameters[1]} ${(this.Parameters[6] ? `gola` : ``)} `;

    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - кількість ящиків 
         * 3 - матеріал корпусу 
         * 4 - матеріал фасаду 
         * 5 - Боковина видима
         * 6 - Gola
         * 7 - Рівність ящиків
         */

        this.getDetails((this.Parameters[5] ? this.Parameters[4] : this.Parameters[3])).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, this.Parameters[0] - (this.Parameters[5] ? 0 : 118), 535, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 535, 1, [2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] - (this.Parameters[5] ? 18 : 0), 535, 1,  [2, 1, 1, 1 ]));
      
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, 1, [ 1, 1, 1, 1 ]));
        let fh = ((this.Parameters[0] - 100) / 2) - (this.Parameters[6] ? 30 : 0);
        let sfh = fh / 2;
        let mfh = (this.Parameters[0] - 100) / 3- (this.Parameters[6] ? 30 : 0);
        //Ящики за кількістю
        switch (this.Parameters[2])
        {
            case 2:
                //Великі ящики
                this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад верх`, fh, this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
                this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад низ`, fh, this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, fh - 145, 2, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, fh - 145, 2, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, fh - 159, 2, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Задня панель ящика`, this.Parameters[1] - 85, fh - 159, 2, [ 2, 1, 1, 1 ]));
                break;
            case 3:
                if (!this.Parameters[7])
                {
                    //Великий ящик
                    this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад низ`, fh, this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, fh - 145, 1, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, fh - 145, 1, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, fh - 159, 1, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Задня панель ящика`, this.Parameters[1] - 85, fh - 159, 1, [ 2, 1, 1, 1 ]));
                    //малі ящики
                    this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад верх`, sfh, this.Parameters[1], 2, [ 2, 2, 2, 2 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, sfh - 57, 2, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, sfh - 57, 2, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, sfh - 71, 2, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, sfh - 71, 2, [ 2, 1, 1, 1 ]));
                }
                else
                {
                    //Середній ящик
                    this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад середина`, mfh, this.Parameters[1], 3, [ 2, 2, 2, 2 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, mfh - 108, 3, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, mfh - 108, 3, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 122, mfh - 71, 3, [ 2, 1, 1, 1 ]));
                    this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Задня панель ящика`, this.Parameters[1] - 122, mfh - 71, 3, [ 2, 1, 1, 1 ]));
                }
                break;
            case 4:
                //малі ящики
                this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад верх`, sfh, this.Parameters[1], 4, [ 2, 2, 2, 2 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, sfh - 57, 4, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, sfh - 57, 4, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, sfh - 71, 4, [ 2, 1, 1, 1 ]));
                this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Задня панель ящика`, this.Parameters[1] - 85, sfh - 71, 4, [ 2, 1, 1, 1 ]));
                break;
            default:
                break;
        }

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Дно ящика`, this.Parameters[1] - 85, 454, 1, [ 1, 1, 1, 1 ]));

        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] - 100, this.Parameters[2], 1, [ 2, 2, 2, 2 ]));
    }
}
class NM_M extends Module
{
    setName()
    {
        this.Name = `НМ${this.Mcount}-М ${this.Parameters[0]}x${this.Parameters[1]} ${(this.Parameters[5] ? `gola` : ``)} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - матеріал корпусу 
         * 3 - матеріал фасаду 
         * 4 - Боковина видима
         * 5 - Gola
         * 6 - Один фасад
         */
        if (this.Parameters[6])
        {
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[5] ? 130 : 100), this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
        }
        else
        {
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[5] ? 130 : 100), this.Parameters[1]/2, 2,   [2, 2, 2, 2 ]));
        }
        

        this.getDetails((this.Parameters[4] ? this.Parameters[3] : this.Parameters[2])).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, this.Parameters[0] - (this.Parameters[4]? 0 : 118), 580, 1, [2, 1, 1, 1]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 535, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] - (this.Parameters[4] ? 18 : 0), 580, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, (this.Parameters[5] ? 2 : 3), [ 2, 1, 1, 1 ]));
    }
}
class NM_DH extends Module
{
    setName()
    {
        this.Name = `НМ${this.Mcount}-ДХ ${this.Parameters[0]}x${this.Parameters[1]} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - матеріал корпусу 
         * 3 - матеріал фасаду 
         */
        let fh = this.Parameters[0] - 704;
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фасад ящика`, fh, this.Parameters[1], 1, [ 2, 2, 2, 2 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, this.Parameters[0] - 118, 580, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 535, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] , 580, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] - 36, 80, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Боковина ящика л`, 490, fh - 57, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Боковина ящика п`, 490, fh - 57, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Передня панель ящика`, this.Parameters[1] - 85, fh - 71, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Задня панель ящика`, this.Parameters[1] - 85, fh - 71, 1, [ 2, 1, 1, 1 ]));
    }
}
class NM_PM extends Module
{
    setName()
    {
        this.Name = `НМ${this.Mcount}-ПМ ${this.Parameters[0]}x${this.Parameters[1]} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - матеріал корпусу 
         * 3 - матеріал фасаду 
         * 4 - gola
         */
        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[4] ? 130 : 100), this.Parameters[1], 1, [ 2, 2, 2, 2 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] , 450, 1, [ 2, 1, 1, 1 ]));
    }
}
class NMK extends Module
{
    setName()
    {
        this.Name = `НМК${this.Mcount} ${this.Parameters[0]}x${this.Parameters[1]} ${this.Parameters[2]} полк. ${(this.Parameters[5] ? `gola` : ``)} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - кількість полок 
         * 3 - матеріал корпусу 
         * 4 - матеріал фасаду 
         * 5 - Gola
         */

        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[5] ? 130 : 100), (this.Parameters[1]) - 55.5, 1, [ 2, 2, 2, 2 ]));
        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фальш фасад`, this.Parameters[0] - (this.Parameters[5] ? 130 : 100), 71, 1, [ 1, 2, 2, 2 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фальш мала`, this.Parameters[0] - (this.Parameters[5] ? 157.5 : 100), 53, 1, [ 1, 1, 1, 1 ]));
        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} Н Фальш фасад`, this.Parameters[0] - (this.Parameters[5] ? 130 : 100), 53, 1, [ 2, 1, 2, 2 ]));


        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, this.Parameters[0] - 118, 535, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 535, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] +585, 535, 1, [ 2, 1, 1, 1 ]));
        if (this.Parameters[2] > 0)
        {
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Полка зйомна`, this.Parameters[1] + 547, 534, this.Parameters[2], [ 2, 1, 1, 1 ]));
        }
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] +549, 80, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] +549, (this.Parameters[5] ? 106 : 80), 1, [ 1, 1, 1, 1 ]));


        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] -100, this.Parameters[1] + 549, 1, [ 2, 2, 2, 2 ]));
    }
}
class NMY_M extends Module
{
    setName()
    {
        this.Name = `НМУ_М${this.Mcount} ${this.Parameters[0]}x${this.Parameters[1]} ${(this.Parameters[4] ? `gola` : ``)} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - матеріал корпусу 
         * 3 - матеріал фасаду 
         * 4 - Gola
         */

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фасад`, this.Parameters[0] - (this.Parameters[4] ? 130 : 100), (this.Parameters[1]) - 55.5, 1, [ 2, 2, 2, 2 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фальш фасад`, this.Parameters[0] - (this.Parameters[4] ? 130 : 100), 71, 1, [ 1, 2, 2, 2 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Фальш мала`, this.Parameters[0] - (this.Parameters[4] ? 157.5 : 100), 53, 1, [ 1, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Фальш фасад`, this.Parameters[0] - (this.Parameters[4] ? 130 : 100), 53, 1, [ 2, 1, 2, 2 ]));


        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Боковина Ліва`, this.Parameters[0] - 118, 578, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Боковина Права`, this.Parameters[0] - 118, 578, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Н Дно`, this.Parameters[1] + 585, 518, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] + 549, 80, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} Н Усилитель`, this.Parameters[1] + 549, 80, (this.Parameters[4] ? 1 : 2), [ 1, 1, 1, 1 ]));

    }
}
class VM extends Module
{
    setName()
    {
        this.Name = `ВМ${this.Mcount} ${this.Parameters[0]}x${this.Parameters[1]} ${this.Parameters[2]} полк.`;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - кількість полок 
         * 3 - матеріал корпусу 
         * 4 - матеріал фасаду 
         * 5 - Боковина видима
         * 6 - Один фасад
         */
        if (this.Parameters[6])
        {
            this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} В Фасад`, this.Parameters[0], this.Parameters[1], 1, [ 2, 2, 2, 2 ]));
        }
        else
        {
            this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} В Фасад`, this.Parameters[0], this.Parameters[1] / 2, 2, [ 2, 2, 2, 2 ]));
        }
        

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Боковина Ліва`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails((this.Parameters[5] ? this.Parameters[4] : this.Parameters[3])).push(newDetail(`M${this.Mcount} В Боковина Права`, this.Parameters[0] - (this.Parameters[5] ? 0 : 18), 320, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Дно`, this.Parameters[1] - (this.Parameters[5] ? 18 : 0), 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Полка`, this.Parameters[1] - 38, 320, this.Parameters[2], [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Кришка`, this.Parameters[1] - 36, 302, 1, [ 2, 1, 1, 1 ]));



        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] - 11, this.Parameters[1]-20, 1, [ 2, 2, 2, 2 ]));
    }
}
class VM_VT extends Module
{
    setName()
    {
        this.Name = `ВМ${this.Mcount}-ВТ ${this.Parameters[0]}x${this.Parameters[1]}`;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - матеріал корпусу 
         * 3 - матеріал фасаду 
         */
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Фасад`, this.Parameters[0], this.Parameters[1], 1, [ 2, 2, 2, 2 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Полка`, this.Parameters[1] - 38, 297, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Боковина Ліва`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Боковина Права`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Дно`, this.Parameters[1], 320, 1, [ 2, 1, 1, 1 ]));
        
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Кришка`, this.Parameters[1] - 36, 302, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} В Полка`, this.Parameters[1] - 36, 302, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Короб`, 646, 200, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Короб`, 646, 218, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[2]).push(newDetail(`M${this.Mcount} Фальш низ`, this.Parameters[1] - 36, 200, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] - 11, this.Parameters[1] - 20, 1, [ 2, 2, 2, 2 ]));
    }
}
class VM_V extends Module
{
    setName()
    {
        this.Name = `ВМ${this.Mcount}_В ${this.Parameters[0]}x${this.Parameters[1]} ${this.Parameters[2]} полк.${(this.Parameters[4] ? `Ст. п.` : ``)} `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина 
         * 2 - кількість полок 
         * 3 - матеріал корпусу 
         * 4 - Стійка посередині
         */

        //Розміри 900 600

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В З/Cт`, this.Parameters[0] - 36, this.Parameters[1]-36, 1, [ 1, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Боковина Ліва`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Боковина Права`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Дно`, this.Parameters[1] , 320, 1, [ 2, 1, 1, 1 ]));
       
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Кришка`, this.Parameters[1] - 36, 303, 1, [ 2, 1, 1, 1 ]));

        if (this.Parameters[4])
        {
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Стойка середина`, this.Parameters[0] - 36, 285, 1, [ 2, 1, 1, 1 ]));
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Полка`, (this.Parameters[1] - 54)/2, 283, this.Parameters[2], [ 2, 1, 1, 1 ]));
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Полка`, (this.Parameters[1] - 54)/2, 283, this.Parameters[2], [ 2, 1, 1, 1 ]));
        }
        else
        {
            this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Полка`, this.Parameters[1] - 38, 283, this.Parameters[2], [ 2, 1, 1, 1 ]));
        }
        
       
    }
}
class VM_K extends Module
{
    setName()
    {
        this.Name = `ВМ${this.Mcount}_К ${this.Parameters[0]}x${this.Parameters[1]} ${this.Parameters[2]} полк. `;
    }
    setDetails()
    {
        /*
         * 0 - висота 
         * 1 - ширина фасаду
         * 2 - кількість полок 
         * 3 - матеріал корпусу 
         * 4 - матеріал фасаду
         */

        //Розміри 900 504.5\
        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} В Фасад`, this.Parameters[0] - 4, this.Parameters[1] , 1, [ 2, 2, 2, 2 ]));

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Боковина Ліва`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Боковина Права`, this.Parameters[0] - 18, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Фальш велика`, this.Parameters[0] - 18, 317, 1, [ 1, 1, 1, 1 ]));
        

        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Кришка`, this.Parameters[1] +351.5, 302, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Дно`, this.Parameters[1] +392.5, 320, 1, [ 2, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Полка`, this.Parameters[1] + 354.5, 297, this.Parameters[2], [ 2, 1, 1, 1 ]));

        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} В Фальш фасад`, this.Parameters[0] - 4, 71, 1, [ 2, 1, 2, 2 ]));
        this.getDetails(this.Parameters[4]).push(newDetail(`M${this.Mcount} В Фальш фасад`, this.Parameters[0] - 4, 53, 1, [ 2, 1, 2, 2 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Фальш мала`, this.Parameters[0] - 18, 53, 1, [ 1, 1, 1, 1 ]));
        this.getDetails(this.Parameters[3]).push(newDetail(`M${this.Mcount} В Фальш нижня`, 317, 71, 1, [ 1, 1, 2, 1 ]));

        this.getDetails(5).push(newDetail(`M${this.Mcount} Задня стінка`, this.Parameters[0] - 11, this.Parameters[1] + 375.5, 1, [ 2, 2, 2, 2 ]));
    }

}