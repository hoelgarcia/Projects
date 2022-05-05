<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
   <!-- c:out ; c:forEach ; c:if -->
 <%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
   <!-- Formatting (like dates) -->
 <%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
   <!-- form:form -->
 <%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>  
   <!-- for rendering errors on PUT routes -->
 <%@ page isErrorPage="true" %>   
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Edit Project</title>
  <!-- Bootstrap -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
      rel="stylesheet" 
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" 
      crossorigin="anonymous">

</head>
<body>
    <div class="container"> <!-- Beginning of Container -->
        <h1>Edit Project Here</h1>
        <a class="btn btn-primary" href="/dashboard">Go Back</a>
        <br>


          <form:form action='/editProject/${project.id}' method='post' modelAttribute="project">
            <input type="hidden" name="_method" value="put">
            <form:label path='title'>Title:</form:label>
            <form:input type="text" path='title'/>
            <form:errors path='title' class="text-danger"/>
            <br>
            <form:label path='description'>Description:</form:label>
            <form:textarea type='text' rows="5" cols="50" path='description'/>
            <form:errors path='description' class="text-danger"/>
            <br>
            <form:label path='dueDate'>Due Date:</form:label>
            <form:input  type='date' path='dueDate'/>
            <form:errors path='dueDate' class="text-danger"/>
            <br>	
            <a class="btn btn-primary" href="/dashboard">Cancel</a>
            <input class="btn btn-primary" type='submit' value='Submit!'/>
          </form:form>




          </div> <!-- End of Container -->
        </body>
        </html>
        