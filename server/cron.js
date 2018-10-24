'use strict'
require('dotenv').config()
const CronJob = require('cron').CronJob
const nodemailer = require('nodemailer')
const kue = require('kue')
const queue = kue.createQueue()
new CronJob('5 * * * * *', function (){
    // console.log('MASUKK-----')
    // should send maximum 20 emails at a time but change back to single email
    // queue.process('email',20, function (job, done) //
    queue.process('email',function (job, done){ 
        // send email after transaction
        // console.log('TEST------', job.data)
        let transporter = nodemailer.createTransport(
            {
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            }
        )

        let mailOptions = {
            from: 'ecosmetics.wonder@gmail.com', // sender address
            to: job.data.to,
            subject: job.data.subject,
            text: job.data.text,
            html: job.data.html
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if(error) {
                console.log('Error occurred');
                console.log(error.message);
            } else {
                console.log('Message sent successfully!');
                console.log(nodemailer.getTestMessageUrl(info));
                done() // finish job if there's any failure
            }
        })

        // remove job whether it was successful or not
        job.on('complete', function (result){
            console.log('Job Successful', result)
            job.remove( function(err){
                // if(err) throw err 
                console.log( 'removed', job.id );
              });
        })
        job.on('failed', function (errorMessage) {
            console.log('ERROR Message ',errorMessage)
            job.remove(function(err){
               // if (err) throw err
               console.log('removed', job.id)
           }) 
        })
    })
}, null, true, 'Asia/Jakarta')