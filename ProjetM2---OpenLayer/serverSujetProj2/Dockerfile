FROM tomcat

RUN apt-get update -yq
RUN apt-get upgrade -yq
RUN apt-get install curl gnupg -yq
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install nodejs -yq
RUN apt-get clean -y
RUN apt-get install maven -y

#Java
RUN apt-get install default-jdk -y
ENV JAVA_HOME /usr/lib/jvm/java-1.8.0-openjdk-amd64/jre

#Tomcat
#RUN groupadd tomcat
#RUN useradd -s /bin/false -g tomcat -d /opt/tomcat tomcat
#RUN mkdir /opt/tomcat
#RUN apt-get install wget
#RUN apt-get install tomcat8 -y
#RUN tar xzvf apache-tomcat-8*tar.gz -C /opt/tomcat --strip-components=1
#RUN cd /opt/tomcat && chgrp -R tomcat /opt/tomcat && chmod -R g+r conf && chmod g+x conf && chown -R tomcat webapps/ work/ temp/ logs/

COPY . /serverSujetProj2
WORKDIR /serverSujetProj2

#ADD pourDocker2.war /usr/local/tomcat/webapps/

EXPOSE 8080

CMD ["catalina.sh", "run"]
#CMD ["/bin/bash"]
