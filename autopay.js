const readlineSync = require('readline-sync');
const puppeteer = require('puppeteer-extra');
var random_name = require('node-random-name');
const fs = require('fs');
const delay = require('delay');
const S = require('string'  );
const { error, Console } = require('console');
const { type } = require('os');
var no = 1;
var moment = require("moment");
var figlet = require('figlet');
var chalk = require('chalk');
var fetch = require('node-fetch');
var request = require('request');

domain = "@haikak.my.id";
(async () => {

    var key = readlineSync.question('[+] License Key : ');

    fetch('https://app.cryptolens.io/api/key/GetKey?token=WyI0NzU1MDYiLCJzODJ1Z3FVQTI4TXU1MEU4aXlOVjUyUmRDcjBtTjZ3TTJIL2RWZklTIl0=&ProductId=9758&Key='+key+'', {
       method: 'GET',
       
   })
 
    .then(res => res.json()) // expecting a json response
    .then(async (json) => {
    
    if (json.result === 1) {
          console.log('[+] Key Not Register');
    } else if (json.result === 0) {
       console.log('[+] Key Register');
 
       if (json.licenseKey.block === true) {
          console.log('[+] Key Not Activated (Blocked)');
       } else if (json.licenseKey.block === false) {
          console.log('[+] Key Activated');
 
          console.log('\n');

          var aww = readlineSync.question('List CreditCard : ');
    console.log('\n')
        const read = fs.readFileSync(aww, 'UTF-8');
        const list = read.split(/\r?\n/);
        for (var i = 0; i < list.length; i++) {
            var cardnum = list[i].split('|')[0];
            var cardmonth = list[i].split('|')[1];
            var cardyear = list[i].split('|')[2];
            var cardcvv = list[i].split('|')[3];
            var name1 = random_name({first:true});
            var name2 = random_name({last:true});
            var fullname = name1+name2;
            var emailAcc = fullname+nope(5)+domain;

        const $options = { waitUntil: 'networkidle2' };
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.goto('https://www.netflix.com/id-en/', $options);
        
        await page.waitForSelector('input[type=email]')
        const emailField = await page.$('input[type=email]')
        await emailField.type(emailAcc)
        await emailField.dispose()

        console.log('[' + no + ']' + 'Login Dengan Email ',emailAcc);
        no++;
        await page.waitForSelector('span.cta-btn-txt')
        const buttonClick = await page.$('span.cta-btn-txt')
        await buttonClick.click()
        await buttonClick.dispose()

        await delay(15000)

        if (page.url().includes('https://www.netflix.com/signup/password')) {

            const password = await page.$('input[type=password]')
            await password.type('Alfarz123!')
            await password.dispose()

            await delay(1000)

            const submit = await page.$('button[type=submit]')
            await submit.click()
            await submit.dispose()

            await delay(1000)


            if (page.url().includes('https://www.netflix.com/signup/regform')) {
                const notice = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia="UIMessage-content"]').innerText;
                })
                console.log(notice)
                console.log('   [',	moment().format('lll'),'] Menunggu 45 menit');
                await delay(2700000)
                continue;
            } else if (page.url().includes('https://www.netflix.com/signup/password')) {
                const notice = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia="UIMessage-content"]').innerText;
                })
                console.log('  ',notice, '\n');
                continue;
            }

            console.log('   Berhasil Mengisi Form Email Dan Form Password [Login]');

            await delay(2000)
            const awwComder = await page.$('div.submitBtnContainer')
            await awwComder.click()
            await awwComder.dispose()

            await delay(3000)

            const planType = await page.$('input[value="114120"]')
            await planType.click()
            await planType.dispose()

            const submitPlan = await page.$('div.submitBtnContainer')
            await submitPlan.click()
            await submitPlan.dispose()
            
            await delay(3000)
            if (page.url().includes('https://www.netflix.com/signup/password')) {
                const rePassword = await page.$('input[type=password]')
                await rePassword.type('Briansan3f')
                await rePassword.dispose()

                
                await delay(6000)

                const submit = await page.$('button[type=submit]')
                await submit.click()
                await submit.dispose()

                console.log('   Akun Tidak Bisa Dipakai Karena Terdaftar')
                continue;
            }
            console.log('   Berhasil Memilih Plan Premium');

            await delay(2000)

            const creditCard = await page.$('div.mopNameAndLogos')
            await creditCard.click()
            await creditCard.dispose()
            await delay(1000)

            const firstName = await page.$('input[data-uia=field-firstName]')
            await firstName.type('Paman')
            await firstName.dispose()

            const lastName = await page.$('input[data-uia=field-lastName]')
            await lastName.type('Kun')
            await lastName.dispose()

            const cardNumber = await page.$('input[data-uia=field-creditCardNumber]')
            await cardNumber.type(cardnum)
            await cardNumber.dispose()

            await delay(1000)
            const cardExpire = await page.$('input[data-uia=field-creditExpirationMonth]')
            await cardExpire.type(cardmonth+cardyear)
            await cardExpire.dispose()

            const cardCVV = await page.$('input[data-uia=field-creditCardSecurityCode]')
            await cardCVV.type(cardcvv)
            await cardCVV.dispose()

            const agree = await page.$('label[for=cb_hasAcceptedTermsOfUse]')
            await agree.click()
            await agree.dispose()

            const buttonPay = await page.$('button[id=simplicityPayment-START]')
            await buttonPay.click()
            await buttonPay.dispose()

            console.log('   Berhasil Memasukan Kartu Kredit Dan Proses Pay')
            await delay(8000)
            if (page.url().includes('otpPhoneEntry')) {
                var nohp = readlineSync.question('   Input Nomor HP +62 : ');

                const otpNumber = await page.$('input[data-uia=field-mobilePhone]')
                await otpNumber.type(nohp)
                await otpNumber.dispose()

                const buttonOtp = await page.$('button[type=button]')
                await buttonOtp.click()
                await buttonOtp.dispose()

                await delay(3000)
                if (page.url().includes('otpPhoneEntry')) {
                    const info = await page.evaluate(() =>{
                        return document.querySelector('div[class=messageContainer').innerText;
                    })

                    console.log('',info);
                } else {
                    var code = readlineSync.question('   OTP Code : ');

                    const otpCode = await page.$('input[data-uia=field-signupOtpCode]')
                    await otpCode.type(code)
                    await otpCode.dispose()
    
                    const buttonCode = await page.$('button[type=button]')
                    await buttonCode.click()
                    await otpCode.dispose()
                }
                await delay(1000)

                if (page.url().includes('orderfinal')) {
                    console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync("netflixpremium.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                    console.log('\n');
                } else if(page.url().includes('otpCodeEntry')) {
                    await delay(5000)
                    if (page.url().includes('orderfinal')) {
                        console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync("netflixpremium.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                        console.log('\n');
                    } else if(page.url().includes('otpCodeEntry')) {
                        await delay(5000)
                    const info = await page.evaluate(() =>{
                        return document.querySelector('div[class=messageContainer').innerText;
                    })

                    console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, '',info);
                    console.log('\n');
                }
            }
            } else if (page.url().includes('creditoption')) {
                const results = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia=UIMessage-content]').innerText;
                })
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : ',results);
                console.log('\n');
                continue;
            } else if (page.url().includes('verifyCardContext')) {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : VBV GOBLOG');
                console.log('\n');
            } else if (page.url().includes('orderfinal')) {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync('netflixpremium.txt', emailAcc + '|Alfarz123!\n');
                console.log('\n');
                continue;
            } else {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Apanih');
                fs.appendFileSync('netflixapanih.txt', emailAcc + '|Alfarz123!\n');
                console.log('\n');
            }
        } else if(page.url().includes('https://www.netflix.com/signup/registration')) {

            await delay(5000)

            const submitEar = await page.$('button[type=button]')
            await submitEar.click()
            await submitEar.dispose()

            await delay(3000)

            const password = await page.$('input[type=password]')
            await password.type('Alfarz123!')
            await password.dispose()

            await delay(3000)

            const submit = await page.$('button[type=submit]')
            await submit.click()
            await submit.dispose()

            await delay(3000)


            if (page.url().includes('https://www.netflix.com/signup/regform')) {
                const notice = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia="UIMessage-content"]').innerText;
                })
                console.log(notice);
                console.log('   [',	moment().format('lll'),'] Menunggu 45 menit');
                await delay(2700000)
                continue;
            } else if (page.url().includes('https://www.netflix.com/signup/password')) {
                const notice = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia="UIMessage-content"]').innerText;
                })
                console.log('  ',notice, '\n');
                continue;
            }

            console.log('   Berhasil Mengisi Form Email Dan Form Password');

            await delay(2000)

            const awwComder = await page.$('div.submitBtnContainer')
            await awwComder.click()
            await awwComder.dispose()

            await delay(3000)

            const planType = await page.$('input[value="114120"]')
            await planType.click()
            await planType.dispose()

            const submitPlan = await page.$('div.submitBtnContainer')
            await submitPlan.click()
            await submitPlan.dispose()

            await delay(3000)
            if (page.url().includes('https://www.netflix.com/signup/password')) {
                const rePassword = await page.$('input[type=password]')
                await rePassword.type('Alfarz123!')
                await rePassword.dispose()

                await delay(2000)

                const submit = await page.$('button[type=submit]')
                await submit.click()
                await submit.dispose()

                console.log('   Akun Tidak Bisa Dipakai Karena Terdaftar')
                continue;
            }

            console.log('   Berhasil Memilih Plan Premium');

            await delay(2000)

            const creditCard = await page.$('div.mopNameAndLogos')
            await creditCard.click()
            await creditCard.dispose()

            await delay(1000)

            const firstName = await page.$('input[data-uia=field-firstName]')
            await firstName.type('Apri')
            await firstName.dispose()

            const lastName = await page.$('input[data-uia=field-lastName]')
            await lastName.type('Amsyah')
            await lastName.dispose()

            const cardNumber = await page.$('input[data-uia=field-creditCardNumber]')
            await cardNumber.type(cardnum)
            await cardNumber.dispose()

            await delay(1000)

            const cardExpire = await page.$('input[data-uia=field-creditExpirationMonth]')
            await cardExpire.type(cardmonth+cardyear)
            await cardExpire.dispose()

            const cardCVV = await page.$('input[data-uia=field-creditCardSecurityCode]')
            await cardCVV.type(cardcvv)
            await cardCVV.dispose()

            const agree = await page.$('label[for=cb_hasAcceptedTermsOfUse]')
            await agree.click()
            await agree.dispose()

            await page.waitForSelector('#simplicityPayment-Start')
            const buttonPay = await page.$('#simplicityPayment-Start')
            await buttonPay.click()
            await buttonPay.dispose()

            console.log('   Berhasil Memasukan Kartu Kredit Dan Proses Pay')
            await delay(8000)
            if (page.url().includes('otpPhoneEntry')) {
                var nohp = readlineSync.question('   Input Nomor HP +62 : ');

                const otpNumber = await page.$('input[data-uia=field-mobilePhone]')
                await otpNumber.type(nohp)
                await otpNumber.dispose()

                const buttonOtp = await page.$('button[type=button]')
                await buttonOtp.click()
                await buttonOtp.dispose()

                await delay(10000)
                if (page.url().includes('otpPhoneEntry')) {
                    const info = await page.evaluate(() =>{
                        return document.querySelector('div[class=messageContainer').innerText;
                    })

                    console.log('',info);
                } else {
                    var code = readlineSync.question('   OTP Code : ');

                    const otpCode = await page.$('input[data-uia=field-signupOtpCode]')
                    await otpCode.type(code)
                    await otpCode.dispose()
    
                    const buttonCode = await page.$('button[type=button]')
                    await buttonCode.click()
                    await otpCode.dispose()
                }
                await delay(1000)

                if (page.url().includes('orderfinal')) {
                    console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync("netflixpremium.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                    console.log('\n');
                } else if(page.url().includes('otpCodeEntry')) {
                    await delay(5000)
                    if (page.url().includes('orderfinal')) {
                        console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync("netflixpremium.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                        console.log('\n');
                    } else if(page.url().includes('otpCodeEntry')) {
                        await delay(5000)
                    const info = await page.evaluate(() =>{
                        return document.querySelector('div[class=messageContainer').innerText;
                    })

                    console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, '',info);
                    console.log('\n');
                }
            }
            } else if (page.url().includes('creditoption')) {
                const results = await page.evaluate(() =>{
                    return document.querySelector('div[data-uia=UIMessage-content]').innerText;
                })
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : ',results);
                console.log('\n');
                continue;
            } else if (page.url().includes('verifyCardContext')) {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : VBV GOBLOG');
                console.log('\n');
            } else if (page.url().includes('orderfinal')) {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Sukses Pay');
                fs.appendFileSync("netflixpremium.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                console.log('\n');
                continue;
            } else {
                console.log('  ',cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv, 'Information : Apanih');
                fs.appendFileSync("netflixapanih.txt", emailAcc + '+Alfarz123!+' + cardnum+'|'+cardmonth+'|'+cardyear+'|'+cardcvv + '\n');
                console.log('\n')
            }
            await browser.close()
        } else {
            console.log('  ',emailAcc, ' Information : Error');
            console.log('\n');
        }
    }
        }
    }
 });
})();
function nope(length) {
    var result           = '';
    var characters       = '12314567890';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

function calculateDays(startDate,endDate)
{
   var start_date = moment(startDate, 'YYYY-MM-DD HH:mm:ss');
   var end_date = moment(endDate, 'YYYY-MM-DD HH:mm:ss');
   var duration = moment.duration(end_date.diff(start_date));
   var days = duration.asDays();       
   return days;
}