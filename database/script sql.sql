#cria um novo database
create database db_controle_filmes_ab;

#ativa o database a ser utilizado
use db_controle_filmes_ab;

#cricao da tabela de filme
create table tbl_filme (
	id    			 int not null primary key auto_increment,
    nome   		     varchar(80) not null,
    duracao          time not null,
    sinopse          text not null,
    data_lancamento  date not null,
    foto_capa        varchar(200),
    link_trailer     varchar (200)
);

create table tbl_pais (
    id int not null primary key auto_increment,
    nome varchar(45) not null
);

create table tbl_idioma (
    id int not null primary key auto_increment,
    nome varchar(45) not null
);

create table tbl_genero (
    id int not null primary key auto_increment,
    nome varchar(45) not null
);

create table tbl_sexo (
    id int not null primary key auto_increment,
    descricao varchar(45) not null
);

create table tbl_ator (
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    tb_sexo_id int,
    foreign key (tb_sexo_id) references tb_sexo(id)
);

create table tbl_diretor (
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    tb_sexo_id int,
    foreign key (tb_sexo_id) references tb_sexo(id)
);

create table tbl_produtora (
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    fundacao varchar(45),
    pais varchar(20),
    tb_pais_id int,
    foreign key (tb_pais_id) references tb_pais(id)
);

create table tbl_nacionalidade (
    id int not null primary key auto_increment,
    nacionalidade varchar(45) not null
);

create table tbl_filme (
    id int not null primary key auto_increment,
    titulo varchar(45) not null,
    duracao time,
    sinopse text,
    data_lancamento date,
    foto_capa varchar(200),
    link_trailer varchar(200),
    tb_pais_id int,
    tb_idioma_id int,
    foreign key (tb_pais_id) references tb_pais(id),
    foreign key (tb_idioma_id) references tb_idioma(id)
);

create table tbl_usuario (
    id int not null primary key auto_increment,
    nome varchar(45) not null,
    email varchar(45) not null,
    senha varchar(45) not null
);

create table tbl_legenda (
    id int not null primary key auto_increment,
    formato varchar(45) not null,
    arquivo_url varchar(200),
    sincronizacao varchar(45),
    data_criacao date,
    tb_idioma_id int,
    foreign key (tb_idioma_id) references tb_idioma(id)
);

create table tbl_avaliacao (
    id int not null primary key auto_increment,
    nota decimal(3,1) not null,
    comentario text,
    data_avaliacao date not null,
    tb_usuario_id int,
    tb_filme_id int,
    foreign key (tb_usuario_id) references tb_usuario(id),
    foreign key (tb_filme_id) references tb_filme(id)
);

create table tbl_filme_genero (
    tb_filme_id int not null,
    tb_genero_id int not null,
    primary key (tb_filme_id, tb_genero_id),
    foreign key (tb_filme_id) references tb_filme(id),
    foreign key (tb_genero_id) references tb_genero(id)
);

create table tbl_filme_produtora (
    tb_filme_id int not null,
    tb_produtora_id int not null,
    primary key (tb_filme_id, tb_produtora_id),
    foreign key (tb_filme_id) references tb_filme(id),
    foreign key (tb_produtora_id) references tb_produtora(id)
);

create table tbl_filme_ator (
    tb_filme_id int not null,
    tb_ator_id int not null,
    primary key (tb_filme_id, tb_ator_id),
    foreign key (tb_filme_id) references tb_filme(id),
    foreign key (tb_ator_id) references tb_ator(id)
);

create table tbl_filme_diretor (
    tb_filme_id int not null,
    tb_diretor_id int not null,
    primary key (tb_filme_id, tb_diretor_id),
    foreign key (tb_filme_id) references tb_filme(id),
    foreign key (tb_diretor_id) references tb_diretor(id)
);

create table tbl_filme_dublador (
    tb_filme_id int not null,
    tb_dublador_id int not null,
    tb_idioma_id int not null,
    primary key (tb_filme_id, tb_dublador_id, tb_idioma_id),
    foreign key (tb_filme_id) references tb_filme(id),
    foreign key (tb_idioma_id) references tb_idioma(id),
    foreign key (tb_dublador_id) references tb_dublador(id)
);

create table tbl_ator_nacionalidade (
    tb_ator_id int not null,
    tb_nacionalidade_id int not null,
    primary key (tb_ator_id, tb_nacionalidade_id),
    foreign key (tb_ator_id) references tb_ator(id),
    foreign key (tb_nacionalidade_id) references tb_nacionalidade(id)
);

create table tbl_diretor_nacionalidade (
    tb_diretor_id int not null,
    tb_nacionalidade_id int not null,
    primary key (tb_diretor_id, tb_nacionalidade_id),
    foreign key (tb_diretor_id) references tb_diretor(id),
    foreign key (tb_nacionalidade_id) references tb_nacionalidade(id)
);

show tables;

desc tbl_genero;

select * from tbl_filme;