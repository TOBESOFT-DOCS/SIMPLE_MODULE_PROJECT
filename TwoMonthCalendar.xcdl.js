//==============================================================================
// Object : nexacro.TwoMonthCalendar
// Group : Component
//==============================================================================
if (!nexacro.TwoMonthCalendar)
{
	//==============================================================================
	// nexacro.TwoMonthCalendar
	//==============================================================================
	nexacro.TwoMonthCalendar = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
	{
		nexacro._CompositeComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
		this.addEvent("onchanged");
	};
	
	var _pTwoMonthCalendar = nexacro._createPrototype(nexacro._CompositeComponent, nexacro.TwoMonthCalendar);
	nexacro.TwoMonthCalendar.prototype = _pTwoMonthCalendar;
	_pTwoMonthCalendar._type_name = "TwoMonthCalendar";
	
	/* accessibility */
	_pTwoMonthCalendar.accessibilityrole = "form";

	_pTwoMonthCalendar.fromValue = undefined;
	_pTwoMonthCalendar.set_fromValue = function (v)
	{
		if(this.form.calFrom)
		{
			this.form.calFrom.set_value(v);
		}
		this.fromValue = v;
	};
	
	_pTwoMonthCalendar.toValue = undefined;
	_pTwoMonthCalendar.set_toValue = function (v)
	{
		if(this.form.calTo)
		{
			this.form.calTo.set_value(v);
		}
		this.toValue = v;
	};
	
	_pTwoMonthCalendar.colorTheme = "";
	_pTwoMonthCalendar.set_colorTheme = function (v)
	{
		var _cssclass = "";
		if(v=="purple")
		{
			_cssclass = "simple_module, simple_module_purple";
		}
		else
		{
			_cssclass = "simple_module";
		}
		
		if(this.form.calFrom && this.form.calTo)
		{
			this.form.calFrom.set_cssclass(_cssclass);
			this.form.calTo.set_cssclass(_cssclass);
		}
		this.colorTheme = v;
	};		
	
	_pTwoMonthCalendar.getDayCount = function ()
	{
		var fromDate = new Date();
		var toDate = new Date();
		var calDate;
		var day = 1000*60*60*24;
		var returnvalue = -1;
		
		if(this.form.calFrom.value && this.form.calTo.value)
		{
			fromDate.setFullYear(this.form.calFrom.getYear());
			fromDate.setMonth(this.form.calFrom.getMonth()-1);
			fromDate.setDate(this.form.calFrom.getDay());
			
			toDate.setFullYear(this.form.calTo.getYear());
			toDate.setMonth(this.form.calTo.getMonth()-1);
			toDate.setDate(this.form.calTo.getDay());
			
			calDate = fromDate.getTime() - toDate.getTime();
			trace("calDate: "+calDate);
			
			returnvalue = Math.abs(calDate/day);
		}
		trace("returnvalue: "+returnvalue);
		return returnvalue;
	};
	
	_pTwoMonthCalendar.on_fire_onchanged = function (obj, pretext, prevalue, posttext, postvalue)
	{
		if (this.onchanged && this.onchanged._has_handlers)
		{
			var evt = new nexacro.ChangeEventInfo(obj, "onchanged", pretext, prevalue, posttext, postvalue);
			return this.onchanged.fireEvent(this, evt);
		}
		return false;
	};	
	
	_pTwoMonthCalendar.addDay = function (nDay)
	{
		var fromDate = new Date();
		var toDate = new Date();
		
		if(this.form.calFrom.value)
		{
			fromDate.setFullYear(this.form.calFrom.getYear());
			fromDate.setMonth(this.form.calFrom.getMonth()-1);
			fromDate.setDate(this.form.calFrom.getDay());
			toDate = new Date(fromDate.addDate(nDay));
			
			var year = toDate.getFullYear().toString().padLeft(4, "0");
			var month = (toDate.getMonth()+1).toString().padLeft(2, "0");
			var day = toDate.getDate().toString().padLeft(2, "0");			
			
			this.form.calTo.set_value(year+month+day);
			return true;
		}
		else
		{
			trace("calFrom value is null");
			return false;
		}
	};	
	
	_pTwoMonthCalendar.on_init_bindSource = function (columnid, propid, ds)
	{
		if (propid == "fromValue") {
			this.fromValue = undefined;
		}		
	};	
	
	_pTwoMonthCalendar.on_change_bindSource = function (propid, ds, row, col)
	{
		if (propid == "fromValue")
        {	
			if (this.form.calFrom)
				this.form.calFrom.on_change_bindSource("value", ds, row, col);
        }
	};	
	
	_pTwoMonthCalendar.on_getBindableProperties = function ()
	{
		return ["fromValue"];
	};	
	
	_pTwoMonthCalendar.on_create_contents = function ()
	{
		this.set_fromValue(this.fromValue);
		this.set_toValue(this.toValue);
		this.set_colorTheme(this.colorTheme);
	};	
	
	/************************************************************************
	FUNCTION : _get_form_module
	DESCRIPTION :
	RETURN :
	************************************************************************/
	_pTwoMonthCalendar._get_form_module = function ()
	{
		return function()
		{
			if (!this._is_form)
			return;
			
			var obj = null;
			
			this.on_create = function()
			{
				this.set_name("TwoMonthCalendar_V2");
				this.set_titletext("TwoMonthCalendar_V2");
				if (nexacro.Form == this.constructor)
				{
					this._setFormPosition(405,200);
				}
				
				// Object(Dataset, ExcelExportObject) Initialize
				
				
				// UI Components Initialize
				obj = new nexacro.Calendar("calFrom","0","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("0");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				obj.set_cssclass("simple_module");
				this.addChild(obj.name, obj);
				
				obj = new nexacro.Calendar("calTo","205","0","200","200",null,null,null,null,null,null,this);
				obj.set_taborder("1");
				obj.set_type("monthonly");
				obj.set_locale("en_US");
				obj.set_cssclass("simple_module");
				this.addChild(obj.name, obj);
				
				// Layout Functions
				//-- Default Layout : this
				obj = new nexacro.Layout("default","",405,200,this,function(p){});
				this.addLayout(obj.name, obj);
				
				// BindItem Information
				
			};
			
			this.loadPreloadList = function()
			{
				
			};
			
			// User Script
			this.registerScript("TwoMonthCalendar.xcdl", function() {
					
					this.calFrom_onchanged = function(obj,e)
					{
						if(this.parent.applyto_bindSource("fromValue", e.postvalue))
						{
							this.parent.set_fromValue(e.postvalue);
							this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
						}
					};
					
					this.calTo_onchanged = function(obj,e)
					{
						if(this.parent.applyto_bindSource("toValue", e.postvalue))
						{
							this.parent.set_toValue(e.postvalue);
							this.parent.on_fire_onchanged(obj, e.pretext, e.prevalue, e.posttext, e.postvalue);
						}
					};
					
				});
			
			// Regist UI Components Event
			this.on_initEvent = function()
			{
				this.calFrom.addEventHandler("onchanged",this.calFrom_onchanged,this);
				this.calTo.addEventHandler("onchanged",this.calTo_onchanged,this);
			};
			
			this.loadIncludeScript("TwoMonthCalendar.xcdl");
			this.loadPreloadList();
			
			// Remove Reference
			obj = null;
		};
	};	
	

	
	delete _pTwoMonthCalendar;
}