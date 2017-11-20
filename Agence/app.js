var mysql = require('mysql');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

app.use(morgan('dev')); // Vistas de log en consultas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.disable('etag');

var port     = process.env.PORT || 8011; //Configuracion del puerto de escucha

//Agrega conexion a mysql
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Alencito0712/',
  database : 'caol'
});

// Crea enrutador
var router = express.Router();

//Ruta del primer servicio rest de tipo get
router.get('/consultor/:sistema/:estado/:tipousuario', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  connection.query(`select CAO_USUARIO.co_usuario, CAO_USUARIO.no_usuario from CAO_USUARIO left join PERMISSAO_SISTEMA on CAO_USUARIO.co_usuario = PERMISSAO_SISTEMA.co_usuario where PERMISSAO_SISTEMA.co_sistema = ${req.params.sistema} and PERMISSAO_SISTEMA.in_ativo = "${req.params.estado}" and PERMISSAO_SISTEMA.co_tipo_usuario=1 or PERMISSAO_SISTEMA.co_tipo_usuario=2 or PERMISSAO_SISTEMA.co_tipo_usuario=3`, function(err, consultores, fields)
    {
      if (err) throw err;
      res.setHeader('content-type', 'application/json');
      res.json(consultores);
    });
})

//Ruta del segundo servicio rest de tipo get
router.get('/getinfoconsultor/:consultor/:fechainicio/:fechafin', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  connection.query(`select
  CAO_OS.CO_OS,
  CAO_FATURA.VALOR,
  CAO_FATURA.TOTAL_IMP_INC,
  SUM((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))) as LIQUIDO,
  substring(CAO_FATURA.DATA_EMISSAO, 1, 7) as MES,
  CAO_SALARIO.BRUT_SALARIO as CUSTO_FIXO,
  SUM(((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))*CAO_FATURA.COMISSAO_CN)/100) as COMISSAO,
  SUM((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))) - CAO_SALARIO.BRUT_SALARIO as LUCRO
  from
   CAO_FATURA
   left join
   CAO_OS
   on CAO_FATURA.co_os = CAO_OS.co_os
   left join
   CAO_SALARIO
   on CAO_OS.co_usuario = CAO_SALARIO.co_usuario
   where CAO_OS.co_usuario = "${req.params.consultor}"
   and CAO_FATURA.DATA_EMISSAO between "${req.params.fechainicio}" and "${req.params.fechafin}" group by MES`, function(err, consultores, fields)
    {
      if (err) throw err;
      res.setHeader('content-type', 'application/json');
      res.json(consultores);
    });
})

//Ruta del tercer servicio rest de tipo get
router.get('/getinfoconsultorgrafico/:consultor/:fechainicio/:fechafin', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  connection.query(`select
  CAO_OS.CO_OS,
  CAO_FATURA.VALOR,
  CAO_FATURA.TOTAL_IMP_INC,
  SUM((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))) as LIQUIDO,
  substring(CAO_FATURA.DATA_EMISSAO, 1, 4) as MES,
  CAO_SALARIO.BRUT_SALARIO as CUSTO_FIXO,
  SUM(((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))*CAO_FATURA.COMISSAO_CN)/100) as COMISSAO,
  SUM((CAO_FATURA.VALOR-((CAO_FATURA.VALOR * CAO_FATURA.TOTAL_IMP_INC)/100))) - CAO_SALARIO.BRUT_SALARIO as LUCRO
  from
   CAO_FATURA
   left join
   CAO_OS
   on CAO_FATURA.co_os = CAO_OS.co_os
   left join
   CAO_SALARIO
   on CAO_OS.co_usuario = CAO_SALARIO.co_usuario
     where CAO_OS.co_usuario = "${req.params.consultor}"
     and CAO_FATURA.DATA_EMISSAO between "${req.params.fechainicio}" and "${req.params.fechafin}" group by MES`, function(err, consultores, fields)
    {
      if (err) throw err;
      res.setHeader('content-type', 'application/json');
      res.json(consultores);
    });
})


// Registra el enrutador
app.use('/api', router);

//Inicia el servicio
app.listen(port);
console.log('Api Rest ejcutandose en puerto: ' + port);

module.exports = app;
